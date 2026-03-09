import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';
import { hashPassword, signToken } from '@/server/auth';

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
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          name: name || 'User',
          phone,
          city,
          role: 'USER',
        },
      });
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
      return NextResponse.json({ error: 'Email or Registration Number already exists' }, { status: 400 });
    }
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
