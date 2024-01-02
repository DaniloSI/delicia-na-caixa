import { formatPrice } from "./format"

export const getTotal = snacks => Object.values(snacks || {}).reduce((p, n) => p + Math.abs(parseInt(n || '0')), 0)

const CENT_PRICE = 80

export const getTotalPrice = snacks => formatPrice((getTotal(snacks) / 100) * CENT_PRICE)