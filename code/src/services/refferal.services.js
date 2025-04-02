import Axios from "./Axios";

const refferalServices = {
    fetchRefferalAddress: () =>
        Axios.get("/registry", { params: { key: 'u' } })
            .then((response) => response.data)
            .catch((e) => {
                throw e;
            }),
    sendInvitattion: (address) =>
        Axios.post('/blockchain/wallet/invite', {
            title: "",
            canonicalIdentifier: "invite",
            customMetadata: { "u": address }
        })
            .then((response) => response.data)
            .catch((e) => {
                throw e;
            }),
    deleteReferredBy: () =>
        Axios.delete("/registry", { params: { key: 'u' } })
            .then((response) => response.data)
            .catch((e) => {
                throw e;
            }),
}
export default refferalServices;