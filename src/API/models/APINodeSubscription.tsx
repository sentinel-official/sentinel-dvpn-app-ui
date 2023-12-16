import APISubscriptionBase from "./APISubscriptionBase";

export default interface APINodeSubscription {
    base: APISubscriptionBase
    nodeAddress: string
    hours: string
}