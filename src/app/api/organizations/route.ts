import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let whereClause = {};
    if (category) {
      whereClause = {
        organizationType: category
      };
    }

    const organizations = await prisma.organization.findMany({
      where: whereClause,
      select: {
        id: true,
        organizationName: true,
        organizationType: true,
        city: true,
        logo: true,
        address: true,
        _count: {
          select: {
            donations: true,
            volunteers: true,
            campaigns: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ organizations });
  } catch (error) {
    console.error('Organizations fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}