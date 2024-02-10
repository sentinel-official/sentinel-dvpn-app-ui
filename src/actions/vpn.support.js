import blockchainServices from "../services/blockchain.services";
import vpnServices from "../services/vpn.services";

export const getSession = async (walletAddress) => {
  try {
    const session = await blockchainServices.getSession(walletAddress);
    return session;
  } catch (e) {
    return null;
  }
};

const getSessionId = (sessionGot) => {
  if (sessionGot && sessionGot.id) {
    return Number.parseInt(sessionGot.id);
  }
  return null;
};

export const createSession = async ({ node, subscription, walletAddress }) => {
  try {
    const sessionGot = await getSession(walletAddress);
    const payload = {
      activeSession: getSessionId(sessionGot, node, subscription),
      subscriptionID: Number.parseInt(subscription.id),
      node: node.address,
    };
    await blockchainServices.postSession(walletAddress, payload);
    return true;
  } catch (e) {
    return false;
  }
};

export const createCredentials = async ({ session, node, walletAddress }) => {
  try {
    const payload = {
      url: node.remote_url,
      nodeProtocol: node.protocol,
      address: walletAddress,
      session: Number.parseInt(session.id),
    };
    const credentials = await blockchainServices.postCredentials(payload);
    return credentials;
  } catch (e) {
    return null;
  }
};

export const connectToVPN = async (credentials) => {
  try {
    const response = await vpnServices.postConnect({ data: credentials });
    return response;
  } catch (e) {
    return null;
  }
};
