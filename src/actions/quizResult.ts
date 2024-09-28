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

    // Insert a new record into the database
    await sql`
    INSERT INTO records (user_id, quiz_data, created_at)
    VALUES (
      ${userId}, ${JSON.stringify(quiz_data)}, ${date}
    );`;

    // insert weak quizzes into the database
    quiz_data.forEach(async (quiz) => {
      const { quiz_id, isCorrect } = quiz;

      if (!isCorrect) {
        await sql`
          INSERT INTO weak_quizzes (user_id, quiz_id, times_answered, times_incorrect)
          VALUES (
            ${userId},
            ${quiz_id},
            1,
            1
          )
          ON CONFLICT (user_id, quiz_id) 
          DO UPDATE SET 
            times_answered = weak_quizzes.times_answered + 1,
            times_incorrect = weak_quizzes.times_incorrect + 1
        `;
      } else {
        await sql`
          INSERT INTO weak_quizzes (user_id, quiz_id, times_answered)
          VALUES (
            ${userId},
            ${quiz_id},
            1
          )
          ON CONFLICT (user_id, quiz_id) 
          DO UPDATE SET 
            times_answered = weak_quizzes.times_answered + 1
        `;
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error');
  }
}
