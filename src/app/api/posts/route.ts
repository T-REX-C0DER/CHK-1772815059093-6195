import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const sort = url.searchParams.get('sort') || 'latest';
    const type = url.searchParams.get('type') || 'all';

    const take = 6;

    // Build filter clauses for raw SQL
    let typeClause = '';
    if (type !== 'all') {
      typeClause = `AND p.postType = '${type.replace(/'/g, "''")}'`;
    }

    // Sort order
    const orderSQL = sort === 'trending'
      ? 'ORDER BY p.likesCount DESC, p.createdAt DESC'
      : 'ORDER BY p.createdAt DESC';

    // Cursor-based pagination
    let cursorClause = '';
    if (cursor) {
      // Find the createdAt/likesCount for the cursor row then paginate after it
      const cursorRows: any[] = await prisma.$queryRawUnsafe(
        `SELECT createdAt, likesCount FROM OrgPost WHERE id = ?`,
        cursor
      );
      if (cursorRows.length > 0) {
        const cursorRow = cursorRows[0];
        if (sort === 'trending') {
          cursorClause = `AND (p.likesCount < ${cursorRow.likesCount} OR (p.likesCount = ${cursorRow.likesCount} AND p.id > '${cursor}'))`;
        } else {
          cursorClause = `AND p.createdAt < '${cursorRow.createdAt}'`;
        }
      }
    }

    const rawPosts: any[] = await prisma.$queryRawUnsafe(`
      SELECT
        p.id, p.postType, p.title, p.description, p.images,
        p.targetAmount, p.raisedAmount, p.supportersCount,
        p.eventDate, p.location, p.category, p.likesCount,
        p.status, p.createdAt,
        o.id as orgId, o.organizationName, o.logo, o.city,
        o.verified, o.organizationType
      FROM OrgPost p
      JOIN Organization o ON p.organizationId = o.id
      WHERE p.status = 'active'
        AND o.verified = 1
        AND o.country = 'India'
        ${typeClause}
        ${cursorClause}
      ${orderSQL}
      LIMIT ${take + 1}
    `);

    let hasMore = false;
    let result = rawPosts;
    if (rawPosts.length > take) {
      hasMore = true;
      result = rawPosts.slice(0, take);
    }

    // Parse images JSON and normalise shape
    const posts = result.map((p: any) => {
      let images: string[] = [];
      try {
        images = p.images ? JSON.parse(p.images) : [];
      } catch {
        images = [];
      }
      return {
        id: p.id,
        postType: p.postType,
        title: p.title,
        description: p.description,
        images,
        targetAmount: p.targetAmount,
        raisedAmount: p.raisedAmount,
        supportersCount: p.supportersCount,
        eventDate: p.eventDate,
        location: p.location,
        category: p.category,
        likesCount: p.likesCount,
        createdAt: p.createdAt,
        organization: {
          id: p.orgId,
          organizationName: p.organizationName || '',
          logo: p.logo || null,
          city: p.city || '',
          verified: p.verified === 1 || p.verified === true,
          organizationType: p.organizationType || 'ngo',
        },
      };
    });

    const nextCursor = hasMore ? result[result.length - 1].id : null;

    return NextResponse.json({ posts, hasMore, nextCursor });
  } catch (error) {
    console.error('Posts fetch error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
