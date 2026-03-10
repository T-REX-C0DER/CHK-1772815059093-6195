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

    let volunteers;

    if (decoded.role === 'USER') {
      // Get user's volunteer applications
      volunteers = await prisma.volunteer.findMany({
        where: { userId: decoded.id },
        include: {
          organization: {
            select: { organizationName: true, logo: true, organizationType: true }
          }
        },
        orderBy: { appliedDate: 'desc' }
      });
    } else if (decoded.role === 'ORGANIZATION') {
      // Get organization's volunteer requests
      volunteers = await prisma.volunteer.findMany({
        where: { organizationId: decoded.id },
        include: {
          user: {
            select: { name: true, email: true, phone: true, city: true }
          }
        },
        orderBy: { appliedDate: 'desc' }
      });
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    return NextResponse.json({ volunteers });
  } catch (error) {
    console.error('Volunteers fetch error:', error);
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

    const { organizationId } = await request.json();

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 });
    }

    // Check if user already applied
    const existingApplication = await prisma.volunteer.findFirst({
      where: {
        userId: decoded.id,
        organizationId
      }
    });

    if (existingApplication) {
      return NextResponse.json({ error: 'Already applied to this organization' }, { status: 400 });
    }

    // Create volunteer application
    const volunteer = await prisma.volunteer.create({
      data: {
        userId: decoded.id,
        organizationId
      },
      include: {
        organization: {
          select: { organizationName: true }
        }
      }
    });

    return NextResponse.json({
      message: 'Volunteer application submitted successfully',
      volunteer
    });
  } catch (error) {
    console.error('Volunteer application error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT endpoint for organizations to approve/reject volunteers
export async function PUT(request: Request) {
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

    const { volunteerId, status } = await request.json();

    if (!volunteerId || !['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Verify the volunteer request belongs to this organization
    const volunteer = await prisma.volunteer.findFirst({
      where: {
        id: volunteerId,
        organizationId: decoded.id
      }
    });

    if (!volunteer) {
      return NextResponse.json({ error: 'Volunteer request not found' }, { status: 404 });
    }

    // Update status
    const updatedVolunteer = await prisma.volunteer.update({
      where: { id: volunteerId },
      data: { status },
      include: {
        user: {
          select: { name: true, email: true }
        },
        organization: {
          select: { organizationName: true }
        }
      }
    });

    return NextResponse.json({
      message: `Volunteer ${status.toLowerCase()} successfully`,
      volunteer: updatedVolunteer
    });
  } catch (error) {
    console.error('Volunteer update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}