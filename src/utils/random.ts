export function generateRandomSuffix(length: number): string {
  // 난수를 36진수로 변환 후 length 만큼 잘라서 반환
  return Math.random().toString(36).slice(-length)
}
