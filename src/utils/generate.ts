export function generateRoomId({ usernameA, usernameB }: { usernameA: string; usernameB: string }) {
  const sortedUsernames = [usernameA, usernameB].sort()

  return `${sortedUsernames[0]}-${sortedUsernames[1]}`
}
