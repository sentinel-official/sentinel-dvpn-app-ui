import { CHANGE_MESSAGE } from "@reducers/loader.reducer";
import settingsServices from "@services/settings.services";

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const total = 15;
const getFeeGrantDetails = async (walletAddress, dispatch) => {
  let attempt = 0;
  while (attempt < total) {
    dispatch(CHANGE_MESSAGE({ description: `Attempt ${attempt + 1} of ${total}` }));
    try {
      const response = await settingsServices.fetchFeeGrantDetails(walletAddress);
      if (response.status === 200) {
        return response.data;
      }
      if (response.response && response.response.status !== 500) {
        throw new Error(response.response.status);
      }
    } catch (error) {
      throw error;
    }
    attempt++;
    await sleep(1000);
  }
};

export default getFeeGrantDetails;
