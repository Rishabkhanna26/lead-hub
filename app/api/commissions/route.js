import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Commission from '@/models/Commission';

export async function GET(request) {
  try {
    await connectDB();
    const commissions = await Commission.find({}).sort({ date: -1 });
    return NextResponse.json(commissions, { status: 200 });
  } catch (error) {
    console.error('Error fetching commissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch commissions', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (
      !body.client ||
      body.totalAmount === undefined ||
      !Array.isArray(body.acquirers) ||
      !Array.isArray(body.workers)
    ) {
      return NextResponse.json(
        { error: 'All split fields are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const newCommission = await Commission.create({
      ...body,
      totalAmount: parseFloat(body.totalAmount),
      acquirers: body.acquirers.map(a => ({ member: a.member, amount: parseFloat(a.amount) })),
      workers: body.workers.map(w => ({ member: w.member, amount: parseFloat(w.amount) })),
    });

    return NextResponse.json(newCommission, { status: 201 });
  } catch (error) {
    console.error('Error creating commission:', error);
    return NextResponse.json(
      { error: 'Failed to create commission' },
      { status: 500 }
    );
  }
}
