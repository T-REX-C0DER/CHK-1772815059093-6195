import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, skills, availability, message } = body;

    if (!id || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // You would typically store skills, availability, message in a more detailed Volunteer model 
    // or as a JSON field. For now we use the existing schema.
    const volunteerAct = await prisma.volunteer.create({
      data: {
        userId,
        organizationId: id,
        status: 'PENDING',
      }
    });

    return NextResponse.json({ success: true, volunteerAct });
  } catch (error) {
    console.error('Error processing volunteer application:', error);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}
