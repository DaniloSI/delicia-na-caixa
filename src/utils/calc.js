export const getTotal = snacks => Object.values(snacks || {}).reduce((p, n) => p + Math.abs(parseInt(n)), 0)