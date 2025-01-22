import { NextRequest, NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { Pool } from 'pg';

// Initialize Neon DB connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Add to .env
});

export async function POST(req: NextRequest) {
  console.log('Webhook received!!');
  try {
    const event: WebhookEvent = await req.json();

    if (event.type === 'user.created') {
      const { id } = event.data;

      // Insert user into Neon DB
      await pool.query(
        'INSERT INTO users (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
        [id] // Pass Clerk user ID as a parameter
      );

      return NextResponse.json({ message: 'User saved to DB' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Unhandled event' }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
