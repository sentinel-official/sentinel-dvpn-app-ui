const formatamount = (amount) => {
  let roundedBalance = Math.floor(amount * 1e4) / 1e4;
  let formattedBalance = roundedBalance.toFixed(4);
  return formattedBalance;
};

export default formatamount;