export default interface APIDevice {
    id: number,
    platform: string,
    token: string,
    is_banned: boolean,
    is_enrolled: boolean,
    wallet_address: string,
}