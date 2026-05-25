 export const formatDateForInput = (date: Date | string | undefined | null): string => {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}