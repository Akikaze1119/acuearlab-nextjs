'use server';
import { neon } from '@neondatabase/serverless';
import { TBoardData, TQuiz_data } from '@/lib/definitions';
import { fetchQuizzesById } from '@/lib/quizData';
import { formatDate } from './dateFormat';

export async function fetchRecords(userId: string): Promise<TBoardData[]> {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`
    SELECT quiz_data, created_at
    FROM records
    WHERE user_id=${userId}
    ORDER BY created_at DESC;
  `;
    if (data.length === 0) {
      throw new Error('No quizzes found.');
    }

    const quizzes = data.map(async (quiz, quizIndex) => {
      const quiz_data: TQuiz_data[] = quiz.quiz_data;
      const quiz_ids = quiz_data.map((data) => data.quiz_id);
      const quiz_data_with_words = await fetchQuizzesById(quiz_ids);

      const boardData = quiz_data.map((boardData) => {
        const quiz_words = quiz_data_with_words.find((q) => q.quiz_id === boardData.quiz_id);
        return {
          quiz_id: boardData.quiz_id,
          word1: quiz_words?.word1 ?? '',
          word2: quiz_words?.word2 ?? '',
          isCorrect: boardData.isCorrect,
        };
      });

      return {
        id: quizIndex + 1,
        created_at: formatDate(new Date(quiz.created_at).toISOString()),
        result: boardData,
      };
    });
    const resolvedQuizzes = await Promise.all(quizzes);
    return resolvedQuizzes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch records.');
  }
}
