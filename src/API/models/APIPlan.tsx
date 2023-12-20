import APIBalance from "./APIBalance";

export default interface APIPlan {
    id: number,
    providerAddress: string,
    prices: [APIBalance]
}