const formatAmount = (amount) => {
  let roundedBalance = Math.floor(amount * 1e2) / 1e2;
  let formattedBalance = roundedBalance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedBalance;
};

export default formatAmount;
