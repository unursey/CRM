export const setDiscount = (discount) => (discount ? (100 - discount) / 100 : 1);

export const getTotal = (price, count, discount) => {
  if (price <= 0 || count <= 0) return 0
  return price * count * setDiscount(discount)
};

export const getTotalTable = (prices = []) => {
  return prices.reduce(
    (acc, { count, price, discount }) => acc + getTotal(price, count, discount),
    0
  )
};

export const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num) ? +num : null
};
