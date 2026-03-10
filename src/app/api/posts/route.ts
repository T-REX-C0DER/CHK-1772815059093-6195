import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

// cursor-based pagination using createdAt
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');

    const take = 5;
    const whereClause = {};

    // use simple typing to avoid inference issues
    const campaigns: any[] = await prisma.campaign.findMany({
      where: whereClause,
      include: {
        organization: {
          select: {
            id: true,
            organizationName: true,
            logo: true,
            // verification flag could be added to schema later
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: take + 1,
      // use id as unique cursor
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

    let hasMore = false;
    let result = campaigns;
    if (campaigns.length > take) {
      hasMore = true;
      result = campaigns.slice(0, take);
    }

    // transform into Post shape
    const posts = result.map(c => ({
      id: c.id,
      organization: {
        id: c.organization?.id || c.organizationId,
        organizationName: c.organization?.organizationName || '',
        logo: c.organization?.logo || undefined,
        isVerified: true // TODO: real field
      },
      createdAt: c.createdAt.toISOString(),
      category: 'General',
      content: c.description,
      image: c.image || undefined,
      raisedAmount: c.collectedAmount,
      goalAmount: c.targetAmount,
      supportersCount: Math.floor(Math.random() * 500) + 1,
      likes: Math.floor(Math.random() * 200),
      comments: Math.floor(Math.random() * 50),
    }));

    return NextResponse.json({ posts, hasMore });
  } catch (error) {
    console.error('Posts fetch error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
