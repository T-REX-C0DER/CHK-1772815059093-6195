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
    if (!decoded || typeof decoded === 'string' || decoded.role !== 'USER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        profilePhoto: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            donations: true,
            volunteerActs: true,
            shelterRequests: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get donation stats
    const donationStats = await prisma.donation.aggregate({
      where: { userId: decoded.id },
      _sum: { amount: true },
      _count: true
    });

    // Get volunteer statistics (sum of hours + count)
    const volunteerStats = await prisma.volunteer.aggregate({
      where: { userId: decoded.id },
      _sum: { hours: true },
      _count: true
    });

    // Get recent donations
    const recentDonations = await prisma.donation.findMany({
      where: { userId: decoded.id },
      include: {
        organization: {
          select: { organizationName: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Get volunteer activities
    const volunteerActivities = await prisma.volunteer.findMany({
      where: { userId: decoded.id },
      include: {
        organization: {
          select: { organizationName: true }
        }
      },
      orderBy: { appliedDate: 'desc' },
      take: 5
    });

    // Get active campaigns
    const activeCampaigns = await prisma.campaign.findMany({
      include: {
        organization: {
          select: { organizationName: true, logo: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 12
    });

    // trending - top 4 by collectedAmount / targetAmount
    const trending = [...activeCampaigns]
      .sort(
        (a, b) =>
          b.collectedAmount / b.targetAmount - a.collectedAmount / a.targetAmount
      )
      .slice(0, 4)
      .map(c => ({
        id: c.id,
        name: c.title,
        percentage: Math.min((c.collectedAmount / c.targetAmount) * 100, 100)
      }));

    // suggestions - pick 3 random orgs
    const orgCount = await prisma.organization.count();
    const randomOffset = Math.max(0, Math.floor(Math.random() * (orgCount - 3)));
    const suggestions = await prisma.organization.findMany({
      take: 3,
      skip: randomOffset,
      select: { id: true, organizationName: true, logo: true, organizationType: true }
    });

    // events - stub upcoming volunteer events (could be from a separate table)
    const events: Array<{ id: string; title: string; date: string; location: string; time?: string }> = [];

    return NextResponse.json({
      profile: user,
      stats: {
        totalDonations: donationStats._sum.amount || 0,
        donationCount: donationStats._count,
        volunteerCount: user._count.volunteerActs,
        totalVolunteering: volunteerStats._sum.hours || 0,
        shelterRequestsCount: user._count.shelterRequests
      },
      recentDonations,
      volunteerActivities,
      activeCampaigns,
      trending,
      suggestions,
      events
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}