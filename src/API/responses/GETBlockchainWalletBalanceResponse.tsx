import APIBalance from "../models/APIBalance";

export default interface GETBlockchainWalletBalanceResponse {
    balances: [APIBalance]
}