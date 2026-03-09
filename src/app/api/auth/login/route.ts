import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';
import { comparePassword, signToken } from '@/server/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body; // role: 'USER', 'ORGANIZATION', or 'ADMIN'

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    let userOrOrg: any = null;
    let finalRole = role;

    // Check Users first
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await comparePassword(password, user.passwordHash)) {
      userOrOrg = user;
      finalRole = user.role;
    } else {
      // Check Organizations
      const org = await prisma.organization.findUnique({
        where: { email },
      });
      
      if (org && await comparePassword(password, org.passwordHash)) {
        userOrOrg = org;
        finalRole = 'ORGANIZATION';
      }
    }

    if (!userOrOrg) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({
      id: userOrOrg.id,
      email: userOrOrg.email,
      role: finalRole,
    });

    const response = NextResponse.json({ 
      message: 'Login successful', 
      user: { id: userOrOrg.id, email: userOrOrg.email, role: finalRole } 
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
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
