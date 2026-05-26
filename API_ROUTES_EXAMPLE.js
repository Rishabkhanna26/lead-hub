// app/api/leads/route.js
// Example API routes for lead management

import { NextResponse } from 'next/server';

// Mock database (replace with real database in production)
let leadsDatabase = [
  {
    id: 1,
    name: 'aaaa',
    company: 'Company A',
    phone: '9876543210',
    email: 'aaaa@example.com',
    source: 'Referral',
    status: 'New',
    priority: 'High',
    value: 50000,
    workedBy: 'Rishabh',
    lockedBy: null,
    requirement: 'Web development',
    createdAt: new Date().toISOString(),
  },
];

// GET /api/leads - Fetch all leads
export async function GET(request) {
  try {
    // Optional: Add query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let filteredLeads = leadsDatabase;

    if (status) {
      filteredLeads = filteredLeads.filter((l) => l.status === status);
    }

    if (priority) {
      filteredLeads = filteredLeads.filter((l) => l.priority === priority);
    }

    return NextResponse.json(filteredLeads, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST /api/leads - Create a new lead
export async function POST(request) {
  try {
    const body = await request.json();

    // Validation
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newLead = {
      id: Date.now(),
      ...body,
      value: parseInt(body.value) || 0,
      createdAt: new Date().toISOString(),
    };

    leadsDatabase.push(newLead);

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}

// ============================================
// app/api/leads/[id]/route.js
// ============================================

// GET /api/leads/[id] - Fetch single lead
export async function GET_BY_ID(request, { params }) {
  try {
    const id = parseInt(params.id);
    const lead = leadsDatabase.find((l) => l.id === id);

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(lead, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

// PUT /api/leads/[id] - Update a lead
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const leadIndex = leadsDatabase.findIndex((l) => l.id === id);

    if (leadIndex === -1) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    const updatedLead = {
      ...leadsDatabase[leadIndex],
      ...body,
      id: leadsDatabase[leadIndex].id, // Prevent ID change
      createdAt: leadsDatabase[leadIndex].createdAt, // Prevent date change
      updatedAt: new Date().toISOString(),
    };

    leadsDatabase[leadIndex] = updatedLead;

    return NextResponse.json(updatedLead, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE /api/leads/[id] - Delete a lead
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const leadIndex = leadsDatabase.findIndex((l) => l.id === id);

    if (leadIndex === -1) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    const deletedLead = leadsDatabase.splice(leadIndex, 1)[0];

    return NextResponse.json(
      { message: 'Lead deleted successfully', lead: deletedLead },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}

// ============================================
// app/api/payments/route.js
// ============================================

let paymentsDatabase = [];

export async function GET_PAYMENTS(request) {
  try {
    return NextResponse.json(paymentsDatabase, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

export async function POST_PAYMENT(request) {
  try {
    const body = await request.json();

    if (!body.client || !body.amount) {
      return NextResponse.json(
        { error: 'Client and amount are required' },
        { status: 400 }
      );
    }

    const newPayment = {
      id: Date.now(),
      ...body,
      amount: parseFloat(body.amount),
      date: new Date().toISOString(),
      status: body.status || 'Completed',
    };

    paymentsDatabase.push(newPayment);

    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}

// ============================================
// app/api/meetings/route.js
// ============================================

let meetingsDatabase = [];

export async function GET_MEETINGS(request) {
  try {
    return NextResponse.json(meetingsDatabase, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}

export async function POST_MEETING(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.dateTime) {
      return NextResponse.json(
        { error: 'Meeting name and date/time are required' },
        { status: 400 }
      );
    }

    const newMeeting = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      status: body.status || 'Scheduled',
    };

    meetingsDatabase.push(newMeeting);

    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}

// ============================================
// INSTRUCTIONS FOR USING THESE ROUTES
// ============================================

/*
1. Create folder structure:
   app/
   ├── api/
   │   ├── leads/
   │   │   ├── route.js
   │   │   └── [id]/
   │   │       └── route.js
   │   ├── payments/
   │   │   └── route.js
   │   └── meetings/
   │       └── route.js

2. Copy relevant functions into each route.js file

3. For [id]/route.js, use the GET_BY_ID, PUT, DELETE functions
   and wrap them as GET, PUT, DELETE exports

4. Replace mock database with real database (MongoDB, PostgreSQL, etc.)

5. Add middleware for authentication:
   import { middleware } from '@/lib/auth';
   
6. Example with real database (MongoDB):
   import { connectDB } from '@/lib/db';
   import { Lead } from '@/models/Lead';
   
   export async function GET(request) {
     await connectDB();
     const leads = await Lead.find({});
     return NextResponse.json(leads);
   }

7. Error handling: Add try-catch blocks as shown above

8. Validation: Implement comprehensive input validation
*/
