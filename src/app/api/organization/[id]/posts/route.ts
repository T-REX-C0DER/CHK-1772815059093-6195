import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    const posts = await prisma.orgPost.findMany({
      where: { organizationId: id, status: 'active' },
      orderBy: { createdAt: 'desc' },
      include: {
        organization: {
          select: {
            id: true,
            organizationName: true,
            logo: true,
            city: true,
            verified: true,
            organizationType: true,
          }
        }
      }
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching organization posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
