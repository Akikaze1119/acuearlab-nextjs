'use server';
import { auth } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { TQuiz_data } from '@/lib/definitions';

export async function createRecord(quiz_data: TQuiz_data[]) {
  const { userId } = auth();
  const date = new Date().toISOString();
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL);
    await sql`
    INSERT INTO records (user_id, quiz_data, created_at)
    VALUES (
      ${userId}, ${JSON.stringify(quiz_data)}, ${date}
    );`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error');
  }
}
