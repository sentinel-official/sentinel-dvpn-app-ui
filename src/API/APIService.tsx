import Http from "./Http";

import POSTProxyDeviceRequest from "./requests/POSTProxyDeviceRequest";
import POSTProxyDeviceResponse from "./responses/POSTProxyDeviceResponse";
import POSTBlockchainWalletRequest from "./requests/POSTBlockchainWalletRequest";
import GETBlockchainWalletResponse from "./responses/GETBlockchainWalletResponse";
import POSTRegistryRequest from "./requests/POSTRegistryRequest";
import GETRegistryResponse from "./responses/GETRegistryResponse";
import GETBlockchainWalletBalanceResponse from "./responses/GETBlockchainWalletBalanceResponse";
import GETProxyIpResponse from "./responses/GETProxyIpResponse";
import GETProxyCountriesResponse from "./responses/GETProxyCountriesResponse";
import GETProxyServersResponse from "./responses/GETProxyServersResponse";
import GETBlockchainWalletSubscriptionsResponse from "./responses/GETBlockchainWalletSubscriptionsResponse";
import POSTBlockchainPlanSubscribeRequest from "./requests/POSTBlockchainPlanSubscribeRequest";
import GETBlockchainPlansResponse from "./responses/GETBlockchainPlansResponse";
import GETBlockchainWalletSessionResponse from "./responses/GETBlockchainWalletSessionResponse";
import POSTBlockchainWalletSessionRequest from "./requests/POSTBlockchainWalletSessionRequest";
import POSTBlockchainFetchCredentialsResponse from "./responses/POSTBlockchainFetchCredentialsResponse";
import POSTBlockchainFetchCredentialsRequest from "./requests/POSTBlockchainFetchCredentialsRequest";
import APIStatus from "./models/APIStatus";
import GETDNSCurrentResponse from "./responses/GETDNSCurrentResponse";
import APIDNS from "./models/APIDNS";
import PUTDNSRequest from "./requests/PUTDNSRequest";


const setKey = (data: POSTRegistryRequest) => {
    return Http.post("/registry", data)
}

const getKey = (key: string) => {
    return Http.get<GETRegistryResponse>("/registry?key=" + key)
}

const deleteKey = (key: string) => {
    return Http.delete("/registry?key=" + key)
}

const registerDevice = (data: POSTProxyDeviceRequest) => {
    return Http.post<POSTProxyDeviceResponse>("/proxy/device", data)
}

const getDevice = (deviceToken: string) => {
    return Http.get<POSTProxyDeviceResponse>("/proxy/device", {
        headers: {
            "x-device-token": deviceToken
        }
    })
}

const createWallet = (data: POSTBlockchainWalletRequest) => {
    return Http.post("/blockchain/wallet", data)
}

const getWallet = () => {
    return Http.get<GETBlockchainWalletResponse>("/blockchain/wallet")
}

const getBalance = (walletAddress: string) => {
    return Http.get<GETBlockchainWalletBalanceResponse>("/blockchain/wallet/" + walletAddress + "/balance")
}

const getIpAddress = (deviceToken: string) => {
    return Http.get<GETProxyIpResponse>("/proxy/ip", {
        headers: {
            "x-device-token": deviceToken
        }
    })
}

const getCountries = (deviceToken: string) => {
    return Http.get<GETProxyCountriesResponse>("/proxy/countries", {
        headers: {
            "x-device-token": deviceToken
        }
    })
}

const getCities = (deviceToken: string, countryId: string) => {
    return Http.get<GETProxyCountriesResponse>("/proxy/countries/" + countryId + "/cities", {
        headers: {
            "x-device-token": deviceToken
        }
    })
}

const getServers = (deviceToken: string, countryId: string, cityId: string) => {
    return Http.get<GETProxyServersResponse>("/proxy/countries/" + countryId + "/cities/" + cityId + "/servers", {
        headers: {
            "x-device-token": deviceToken
        }
    })
}

const getPlans = () => {
    return Http.get<GETBlockchainPlansResponse>("/blockchain/plans?limit=100000&offset=0")
}

const getSubscriptions = (walletAddress: string) => {
    return Http.get<GETBlockchainWalletSubscriptionsResponse>("/blockchain/wallet/" + walletAddress + "/subscriptions?limit=100000&offset=0")
}

const subscribeToPlan = (planId: number, data: POSTBlockchainPlanSubscribeRequest) => {
    return Http.post("/blockchain/plans/" + planId + "/subscription", data, {
        headers: {
            "x-chain-id": "sentinelhub-2",
            "x-gas-prices": 1000000
        }
    })
}

const getSession = (walletAddress: string) => {
    return Http.get<GETBlockchainWalletSessionResponse>("/blockchain/wallet/" + walletAddress + "/session")
}

const createSession = (walletAddress: string, data: POSTBlockchainWalletSessionRequest) => {
    return Http.post("/blockchain/wallet/" + walletAddress + "/session", data, {
        headers: {
            "x-chain-id": "sentinelhub-2",
            "x-gas-prices": 1000000
        }
    })
}

const fetchCredentials = (data: POSTBlockchainFetchCredentialsRequest) => {
    return Http.post<any>("/blockchain/wallet/connect", data, {
        headers: {
            "x-chain-id": "sentinelhub-2",
            "x-gas-prices": 1000000
        }
    })
}

const getStatus = () => {
    return Http.get<APIStatus>("/status")
}

const connect = (data: any) => {
    return Http.post<APIStatus>("/connect", data)
}

const disconnect = ()=> {
    return Http.post<APIStatus>("/disconnect")
}

const getAvailableDNS = () => {
    return Http.get<GETDNSCurrentResponse>("/dns/list")
}

const getCurrentDNS = () => {
    return Http.get<APIDNS>("/dns/current")
}

const setDNS = (data: PUTDNSRequest) => {
    return Http.put("/dns", data)
}


const APIService = {
    setKey,
    getKey,
    deleteKey,
    registerDevice,
    getDevice,
    createWallet,
    getWallet,
    getBalance,
    getIpAddress,
    getCountries,
    getCities,
    getServers,
    getPlans,
    getSubscriptions,
    subscribeToPlan,
    getSession,
    createSession,
    fetchCredentials,
    getStatus,
    connect,
    disconnect,
    getAvailableDNS,
    getCurrentDNS,
    setDNS
};

export default APIService;