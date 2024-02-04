import { formatPrice } from "./format";

export const getTotal = (snacks) => {
  return Object.values(snacks || {}).reduce(
    (p, n) => p + Math.abs(parseInt(n || "0")),
    0
  );
};

export const getTotalPrice = (snacks, snacksStore) => {
  const total = Object.entries(snacks)
    .map(
      ([namePlural, quantity]) =>
        (quantity * (snacksStore?.find((s) => s.namePlural === namePlural).centPrice ?? 0)) /
        100
    ).reduce((p, c) => p + c, 0);

  return formatPrice(total);
};
