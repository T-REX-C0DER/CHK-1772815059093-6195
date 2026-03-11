import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { amount, userId } = body;

    if (!id || !amount || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        userId,
        organizationId: id,
        paymentStatus: 'COMPLETED', // Mocking success for now
      }
    });

    // Optionally update campaign raisedAmount here if it was for a specific campaign

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('Error processing donation:', error);
    return NextResponse.json({ error: 'Failed to process donation' }, { status: 500 });
  }
}
