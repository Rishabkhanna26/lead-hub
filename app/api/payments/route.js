import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Payment from '@/models/Payment';

export async function GET(request) {
  try {
    await connectDB();
    const payments = await Payment.find({}).sort({ date: -1 });
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.client || !body.amount) {
      return NextResponse.json(
        { error: 'Client and amount are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const newPayment = await Payment.create({
      ...body,
      amount: parseFloat(body.amount),
    });

    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
