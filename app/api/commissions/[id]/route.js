import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Commission from '@/models/Commission';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();
    
    if (body.totalAmount !== undefined) body.totalAmount = parseFloat(body.totalAmount);
    if (Array.isArray(body.acquirers)) {
      body.acquirers = body.acquirers.map(a => ({ member: a.member, amount: parseFloat(a.amount) }));
    }
    if (Array.isArray(body.workers)) {
      body.workers = body.workers.map(w => ({ member: w.member, amount: parseFloat(w.amount) }));
    }
    
    const updatedCommission = await Commission.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!updatedCommission) {
      return NextResponse.json({ error: 'Commission not found' }, { status: 404 });
    }
    return NextResponse.json(updatedCommission, { status: 200 });
  } catch (error) {
    console.error('Error updating commission:', error);
    return NextResponse.json({ error: 'Failed to update commission' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const deletedCommission = await Commission.findByIdAndDelete(id);
    if (!deletedCommission) {
      return NextResponse.json({ error: 'Commission not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Commission deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting commission:', error);
    return NextResponse.json({ error: 'Failed to delete commission' }, { status: 500 });
  }
}
