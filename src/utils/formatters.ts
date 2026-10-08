/**
 * Formats a number into Indian Rupee format (e.g., ₹28,499)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates total number of nights between check-in and check-out date strings.
 */
export function calculateNights(checkIn: string | null, checkOut: string | null): number {
  if (!checkIn || !checkOut) return 5; // Default fallback to 5 nights matching reference
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

/**
 * Formats ISO date string to readable format e.g. '18 Oct 2026' or '10/18/2026'
 */
export function formatDateDisplay(dateStr: string | null, format: 'short' | 'slash' | 'long' = 'short'): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  if (format === 'slash') {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}
