'use server';
import { neon } from '@neondatabase/serverless';
import { TQuiz, TQuiz_data } from './definitions';

export async function fetchQuizzes(): Promise<TQuiz[]> {
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
    throw new Error('Failed to fetch quizzes.');
  }
}

export async function fetchQuizzesById(quiz_ids: number[]): Promise<TQuiz[]> {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL);
    const quizzes = quiz_ids.map(async (quiz_id) => {
      const data = await sql`
      SELECT quiz_id, word1, word2
      FROM quizzes
      WHERE quiz_id=${quiz_id};
    `;
      return {
        quiz_id: data[0].quiz_id,
        word1: data[0].word1,
        word2: data[0].word2,
      };
    });
    return Promise.all(quizzes);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quiz.');
  }
}
