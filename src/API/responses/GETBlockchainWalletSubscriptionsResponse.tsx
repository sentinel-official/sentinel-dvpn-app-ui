import APINodeSubscription from "../models/APINodeSubscription";

export default interface GETBlockchainWalletSubscriptionsResponse {
    nodeSubscriptions?: [APINodeSubscription]
}