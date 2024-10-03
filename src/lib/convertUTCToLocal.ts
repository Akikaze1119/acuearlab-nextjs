export function convertUTCToLocal(utcDateString: string) {
  const utcDate = new Date(utcDateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Use the local time zone
  };
  const localDateString = new Intl.DateTimeFormat('en-CA', options).format(utcDate);

  return localDateString;
}
