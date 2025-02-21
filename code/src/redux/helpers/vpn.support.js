import vpnServices from "@services/vpn.services";

export const getSessionDetails = async (walletAddress) => {
  try {
    const response = await vpnServices.fetchSessionDetails(walletAddress);
    return response;
  } catch (error) {
    console.log("error", error);
    if (error.response.status === 404) {
      return null;
    }
    return { error: true };
  }
};
