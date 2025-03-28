export function formatToKoreanTime(timestamp: string): string {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}
