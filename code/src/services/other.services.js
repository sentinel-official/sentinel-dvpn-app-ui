import Axios from "axios";
const otherServices = {
  fetchCurrentPrice: () =>
    Axios.get(`https://api.coingecko.com/api/v3/coins/sentinel`, {
      headers: {
        "Content-type": "application/json",
      },
      params: {
        community_data: false,
        developer_data: false,
        localization: false,
        sparkline: false,
        tickers: false,
        description: false,
      },
      timeout: 30000,
    })
      .then((response) => {
        return response?.data?.market_data?.current_price?.usd;
      })
      .catch((error) => {
        throw error;
      }),
};

export default otherServices;
