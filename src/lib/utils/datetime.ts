export function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1)

  const days: number[] = []
  while (date.getMonth() === month) {
    days.push(date.getDate())
    date.setDate(date.getDate() + 1)
  }
  return days
}
