export function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

export function formatPrice(value: number, currency = '$'): string {
  return `${currency}${value.toLocaleString('en-US')}`
}
