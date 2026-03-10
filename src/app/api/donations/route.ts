import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/server/db';
import { verifyToken } from '@/server/auth';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let donations;

    if (decoded.role === 'USER') {
      // Get user's donations
      donations = await prisma.donation.findMany({
        where: { userId: decoded.id },
        include: {
          organization: {
            select: { organizationName: true, logo: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else if (decoded.role === 'ORGANIZATION') {
      // Get organization's received donations
      donations = await prisma.donation.findMany({
        where: { organizationId: decoded.id },
        include: {
          user: {
            select: { name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    return NextResponse.json({ donations });
  } catch (error) {
    console.error('Donations fetch error:', error);
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
    if (!decoded || typeof decoded === 'string' || decoded.role !== 'USER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { organizationId, amount } = await request.json();

    if (!organizationId || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid donation data' }, { status: 400 });
    }

    // Verify organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId }
    });

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Create donation
    const donation = await prisma.donation.create({
      data: {
        userId: decoded.id,
        organizationId,
        amount: parseFloat(amount),
        paymentStatus: 'COMPLETED' // In real app, this would be handled by payment gateway
      },
      include: {
        organization: {
          select: { organizationName: true }
        }
      }
    });

    return NextResponse.json({
      message: 'Donation successful',
      donation
    });
  } catch (error) {
    console.error('Donation creation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}