import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const sort = url.searchParams.get('sort') || 'latest'; // latest | trending
    const type = url.searchParams.get('type') || 'all';    // all | campaign | event | awareness

    const take = 6;

    // Build where clause — only verified Indian NGOs with active posts
    const whereClause: Record<string, unknown> = {
      status: 'active',
      organization: {
        verified: true,
        country: 'India',
      },
    };

    if (type !== 'all') {
      whereClause.postType = type;
    }

    // Order by
    const orderBy =
      sort === 'trending'
        ? [{ likesCount: 'desc' as const }, { createdAt: 'desc' as const }]
        : [{ createdAt: 'desc' as const }];

    const rawPosts = await (prisma as any).orgPost.findMany({
      where: whereClause,
      include: {
        organization: {
          select: {
            id: true,
            organizationName: true,
            logo: true,
            city: true,
            verified: true,
            organizationType: true,
          },
        },
      },
      orderBy,
      take: take + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

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
        createdAt: p.createdAt.toISOString(),
        organization: {
          id: p.organization?.id,
          organizationName: p.organization?.organizationName || '',
          logo: p.organization?.logo || null,
          city: p.organization?.city || '',
          verified: p.organization?.verified || false,
          organizationType: p.organization?.organizationType || 'ngo',
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
