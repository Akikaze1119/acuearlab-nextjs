'use server';
import { neon } from '@neondatabase/serverless';
import { Quizzes } from './definitions';

export async function fetchQuizzes(): Promise<Quizzes> {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`
    SELECT quiz_id, word1, word2
    FROM quizzes
    ORDER BY RANDOM()
    LIMIT 5;
  `;
    return data.map((row: any) => ({
      quiz_id: row.quiz_id,
      word1: row.word1,
      word2: row.word2,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
