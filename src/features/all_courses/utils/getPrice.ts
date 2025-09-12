export function getPriceValue(
  price: number | { source: string; parsedValue: number }
): number {
  if (typeof price === "number") return price;
  return price?.parsedValue ?? 0;
}