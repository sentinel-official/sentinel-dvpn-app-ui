import {NavLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import APIService from "../../API/APIService";
import {useEffect, useState} from "react";
import APICountry from "../../API/models/APICountry";
import APICity from "../../API/models/APICity";
import APIServer from "../../API/models/APIServer";
import POSTRegistryRequest from "../../API/requests/POSTRegistryRequest";

const NodesCitiesScreen = () => {

    const navigate = useNavigate();
    let {countryId, cityId} = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [servers, setServers] = useState([]);

    const updateServers = () => {
        APIService.getServers(localStorage.getItem("deviceToken")!, countryId!, cityId!).then((response: any) => {
            setServers(response.data.data);
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        })
    }

    useEffect(() => {
        updateServers();
    }, []);

    const selectServer = (index: number) => {
        const server = servers[index];
        const selectedNode = {
            countryCode: searchParams.get("countryCode")!,
            cityName: searchParams.get("cityName")!,
            server: server
        }

        const payload: POSTRegistryRequest = {
            key: "selectedNode",
            value: JSON.stringify(selectedNode),
            is_secure: false
        }

        APIService.setKey(payload).then((response: any) => {
            localStorage.setItem("selectedNode", JSON.stringify(selectedNode));
            navigate("/app");
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        });
    }

    return (
        <div className="nodesScreenContainer">
            <div className="topBar">
                <div className="buttonWrapper">
                    <NavLink
                        to={"/app/nodes/countries/" + countryId + "?countryCode=" + searchParams.get("countryCode")}
                        className="backButton"
                    />
                </div>
                <div className="titleWrapper">
                    <span>Select a server</span>
                </div>
                <div className="buttonWrapper">
                    <div className="spacer"/>
                </div>
            </div>

            <div className="list">
                {servers.map((server: APIServer, index) => {
                    return (
                        <button id={"server-" + index} onClick={() => {
                            selectServer(index)
                        }} className="location">
                            <div className="infoWrapper">
                                <span className="title">{server.name}</span>
                                <span className="subtitle">{server.address}</span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
};

export default NodesCitiesScreen;