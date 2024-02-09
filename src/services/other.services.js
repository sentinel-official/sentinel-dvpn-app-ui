import Axios from "axios";
const otherServices = {
  getCurrentPrice: () =>
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/sentinel?community_data=false&developer_data=false&localization=false&sparkline=false&tickers=false&description=false`
    )
      .then((response) => {
        return response?.data?.market_data?.current_price?.usd;
      })
      .catch((error) => {
        throw new Error(error);
      }),
};

export default otherServices;