export function getDate() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const dateString = new Intl.DateTimeFormat('en-CA', options).format(now);
  console.log('dateString:', dateString);

  return dateString;
}