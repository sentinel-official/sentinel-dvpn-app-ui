export const RPC_ERROR = "RPC_ERROR";

export const rpcErrorEvent = () => {
  const event = new CustomEvent(RPC_ERROR);
  return event;
};


export const INTERNET_STATUS = "INTERNET_STATUS"
export const updateInternetStatus = (status) => {
    const event = new CustomEvent(INTERNET_STATUS, { detail: {status} });
    return event;
}