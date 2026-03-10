import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';
import { hashPassword, signToken } from '@/server/auth';
import crypto from 'crypto';

function hashAadhaar(aadhaarNumber: string): string {
  return crypto.createHash('sha256').update(aadhaarNumber).digest('hex');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      role, // 'USER' or 'ORGANIZATION'
      email, 
      password, 
      name, 
      phone, 
      location: city, // Front-end uses location
      aadhaarNumber,
      // Org specific
      website,
      registrationId: registrationNumber,
    } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    let userData: any = null;

    if (role === 'USER') {
      // Validate Aadhaar for users
      if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
        return NextResponse.json(
          { error: 'Please enter a valid 12-digit Aadhaar number' }, 
          { status: 400 }
        );
      }

      // Hash Aadhaar with SHA-256 for secure, deterministic storage
      const aadhaarHash = hashAadhaar(aadhaarNumber);
      const aadhaarLast4 = aadhaarNumber.slice(-4);

      // Check if Aadhaar is already registered
      const existingAadhaar = await prisma.user.findUnique({
        where: { aadhaarHash },
      });
      if (existingAadhaar) {
        return NextResponse.json(
          { error: 'This Aadhaar number is already registered' }, 
          { status: 400 }
        );
      }

      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          name: name || 'User',
          phone,
          city,
          role: 'USER',
          aadhaarHash,
          aadhaarLast4,
        },
      });

      // Never expose aadhaarHash or aadhaarLast4 in signup response
      userData = { id: user.id, email: user.email, role: user.role, name: user.name };
    } else if (role === 'ORGANIZATION') {
      const org = await prisma.organization.create({
        data: {
          email,
          passwordHash: hashedPassword,
          organizationName: name || 'New Organization',
          organizationType: 'NGO',
          registrationNumber: registrationNumber || `REG-${Date.now()}`,
          phone,
          city,
        },
      });
      userData = { 
        id: org.id, 
        email: org.email, 
        role: 'ORGANIZATION', 
        name: org.organizationName,
        organizationName: org.organizationName,
        city: org.city
      };
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const token = signToken({
      id: userData.id,
      email: userData.email,
      role: userData.role,
    });

    const response = NextResponse.json({ 
      message: `${role === 'USER' ? 'User' : 'Organization'} created successfully`, 
      user: userData 
    });

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Determine which unique field was violated
      const target = error.meta?.target;
      if (target?.includes('aadhaarHash')) {
        return NextResponse.json(
          { error: 'This Aadhaar number is already registered' }, 
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'Email or Registration Number already exists' }, 
        { status: 400 }
      );
    }
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
