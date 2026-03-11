import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, personName, age, location, description, photo } = body;

    if (!id || !userId || !personName || !age || !location || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const shelterRequest = await prisma.shelterRequest.create({
      data: {
        userId,
        organizationId: id,
        personName,
        age: parseInt(age),
        location,
        description,
        photo,
        status: 'PENDING',
      }
    });

    return NextResponse.json({ success: true, shelterRequest });
  } catch (error) {
    console.error('Error processing shelter request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
