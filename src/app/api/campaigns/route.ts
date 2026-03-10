import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/server/db';
import { verifyToken } from '@/server/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let whereClause = {};
    if (category) {
      // Filter by organization type
      whereClause = {
        organization: {
          organizationType: category
        }
      };
    }

    const campaigns = await prisma.campaign.findMany({
      where: whereClause,
      include: {
        organization: {
          select: {
            organizationName: true,
            logo: true,
            organizationType: true,
            city: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Campaigns fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string' || decoded.role !== 'ORGANIZATION') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, targetAmount, image } = await request.json();

    if (!title || !description || !targetAmount || targetAmount <= 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        organizationId: decoded.id,
        title,
        description,
        targetAmount: parseFloat(targetAmount),
        image
      },
      include: {
        organization: {
          select: { organizationName: true }
        }
      }
    });

    return NextResponse.json({
      message: 'Campaign created successfully',
      campaign
    });
  } catch (error) {
    console.error('Campaign creation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}