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

    const organization = await prisma.organization.findUnique({
      where: { id },
      select: {
        id: true,
        organizationName: true,
        organizationType: true,
        logo: true,
        city: true,
        address: true,
        verified: true,
        createdAt: true,
        _count: {
          select: {
            campaigns: true,
            donations: true,
            volunteers: true,
            orgPosts: true,
          }
        }
      }
    });

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    return NextResponse.json({ organization });
  } catch (error) {
    console.error('Error fetching organization:', error);
    return NextResponse.json({ error: 'Failed to fetch organization' }, { status: 500 });
  }
}
