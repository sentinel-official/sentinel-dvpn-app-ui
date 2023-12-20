import APISubscriptionBase from "./APISubscriptionBase";

export default interface APIPlanSubscription {
    base: APISubscriptionBase
    planId: string
}