export const formatPrice = (price, options) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    ...options,
  }).format(price);

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
