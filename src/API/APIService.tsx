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
import POSTBlockchainNodeSubscribeRequest from "./requests/POSTBlockchainNodeSubscribeRequest";


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


const getSubscriptions = (walletAddress: string) => {
    return Http.get<GETBlockchainWalletSubscriptionsResponse>("/blockchain/wallet/" + walletAddress + "/subscriptions?limit=100000&offset=0")
}

const subscribeToNode = (nodeAddress: string, data: POSTBlockchainNodeSubscribeRequest) => {
    return Http.post("/blockchain/nodes/" + nodeAddress + "/subscription", data, {
        headers: {
            "x-chain-id": "sentinelhub-2",
            "x-gas-prices": 1000000
        }
    })
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
    getSubscriptions,
    subscribeToNode
};

export default APIService;