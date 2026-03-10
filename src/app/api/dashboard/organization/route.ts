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
    if (!decoded || typeof decoded === 'string' || decoded.role !== 'ORGANIZATION') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get organization profile
    const organization = await prisma.organization.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        organizationName: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        logo: true,
        organizationType: true,
        registrationNumber: true,
        createdAt: true,
        _count: {
          select: {
            campaigns: true,
            donations: true,
            volunteers: true
          }
        }
      }
    });

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Get donation stats
    const donationStats = await prisma.donation.aggregate({
      where: { organizationId: decoded.id },
      _sum: { amount: true },
      _count: true
    });

    // Get recent donations
    const recentDonations = await prisma.donation.findMany({
      where: { organizationId: decoded.id },
      include: {
        user: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Get campaigns
    const campaigns = await prisma.campaign.findMany({
      where: { organizationId: decoded.id },
      orderBy: { createdAt: 'desc' }
    });

    // Get volunteer requests
    const volunteerRequests = await prisma.volunteer.findMany({
      where: { organizationId: decoded.id },
      include: {
        user: {
          select: { name: true, email: true, phone: true }
        }
      },
      orderBy: { appliedDate: 'desc' }
    });

    return NextResponse.json({
      profile: organization,
      stats: {
        totalDonations: donationStats._sum.amount || 0,
        donationCount: donationStats._count,
        campaignCount: organization._count.campaigns,
        volunteerCount: organization._count.volunteers
      },
      recentDonations,
      campaigns,
      volunteerRequests
    });
  } catch (error) {
    console.error('Organization dashboard error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}