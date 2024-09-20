# API design memo

## Start the quiz

GET /api/games

## End Quiz and Display Score

POST /api/games/score
Description: After all questions are answered,

- 1. Post the final score to "Record" table. When the data is added to DB, adding "ID" and "createdDate" to data.
- 2. Add the data to "weakQuestions" table.

```
{
  user_id: string,
  "records": [
    {
      quizId: "string",
      correct: true,
    },
      {
      quizId: "string",
      correct: true,
    },
      {
      quizId: "string",
      correct: true,
    },
      {
      quizId: "string",
      correct: true,
    },
      {
      quizId: "string",
      correct: true,
    },
  ],
  created_at: Date,
}
```

## View Past Records

GET /api/records/{userId}
Description: Fetch the user’s past quiz records. 15 hits

```
{
  "records": [
    {
      "gameId": "string",
      "date": "2024-09-18"
    }
  ]
}
```
