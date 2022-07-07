export const setDiscount = (discont) => (discont ? (100 - discont) / 100 : 1);

export const getTotal = (price, count, discont) => {
  if (price <= 0 || count <= 0) return 0
  return price * count * setDiscount(discont)
};

export const getTotalTable = (prices = []) => {
  return prices.reduce(
    (acc, { count, price, discont }) => acc + getTotal(price, count, discont),
    0
  )
};

export const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num) ? +num : null
};

export const newTotalSum = (allProductSum, data) => {
  allProductSum.textContent = `$ ${getTotalTable(data).toFixed(2)}`;
};

