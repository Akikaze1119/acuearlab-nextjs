// Intl.DateTimeFormatをインスタンス化
const formatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'America/Toronto', // タイムゾーンを指定（必要に応じて変更）
});

export function formatDate(dateString: string | number | Date): string {
  const date = new Date(dateString);
  const parts = formatter.formatToParts(date);

  // YYYY-MM-DD HH:MM:SS形式に再構築
  const formattedDate = `${parts.find((p) => p.type === 'year')?.value}-${
    parts.find((p) => p.type === 'month')?.value
  }-${parts.find((p) => p.type === 'day')?.value}`;
  const formattedTime = `${parts.find((p) => p.type === 'hour')?.value}:${
    parts.find((p) => p.type === 'minute')?.value
  }:${parts.find((p) => p.type === 'second')?.value}`;

  return `${formattedDate} ${formattedTime}`;
}
