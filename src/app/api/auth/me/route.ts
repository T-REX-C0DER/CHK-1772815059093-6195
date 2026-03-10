import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/db';
import { verifyToken } from '@/server/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token) as { id: string; role: string } | null;

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (decoded.role === 'ORGANIZATION') {
      const org = await prisma.organization.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          organizationName: true,
          email: true,
          city: true,
        },
      });

      if (!org) {
        return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
      }

      return NextResponse.json({
        id: org.id,
        name: org.organizationName,
        email: org.email,
        role: 'ORGANIZATION',
        city: org.city,
      });
    } else {
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          city: true,
          aadhaarLast4: true,
          // Never select aadhaarHash or passwordHash
        },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Return masked Aadhaar for dashboard display
      const maskedAadhaar = user.aadhaarLast4
        ? `**** **** ${user.aadhaarLast4}`
        : null;

      return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        city: user.city,
        maskedAadhaar,
      });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
