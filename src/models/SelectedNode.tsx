import APIServer from "../API/models/APIServer";

export default interface SelectedNode {
    countryCode: string,
    cityName: string,
    server: APIServer | null
}