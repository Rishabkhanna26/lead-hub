import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Meeting from '@/models/Meeting';

export async function GET(request) {
  try {
    await connectDB();
    const meetings = await Meeting.find({}).sort({ dateTime: -1 });
    return NextResponse.json(meetings, { status: 200 });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.dateTime) {
      return NextResponse.json(
        { error: 'Meeting name and date/time are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const newMeeting = await Meeting.create(body);

    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}
