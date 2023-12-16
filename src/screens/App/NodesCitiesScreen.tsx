import {NavLink, useParams, useSearchParams} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import APIService from "../../API/APIService";
import {useEffect, useState} from "react";
import APICountry from "../../API/models/APICountry";
import APICity from "../../API/models/APICity";

const NodesCitiesScreen = () => {

    let {countryId} = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const [cities, setCities] = useState([]);

    const updateCities = () => {
        APIService.getCities(localStorage.getItem("deviceToken")!, countryId!).then((response: any) => {
            setCities(response.data.data);
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        })
    }

    useEffect(() => {
        updateCities();
    }, []);

    return (
        <div className="nodesScreenContainer">

            <div className="topBar">
                <div className="buttonWrapper">
                    <NavLink to={"/app/nodes"} className="backButton"/>
                </div>
                <div className="titleWrapper">
                    <span>Select a city</span>
                </div>
                <div className="buttonWrapper">
                    <div className="spacer"/>
                </div>
            </div>

            <div className="list">
                {cities.map((city: APICity, index) => {
                    return (
                        <NavLink id={"city-" + index} className="location"
                                 to={"/app/nodes/countries/" + countryId + "/cities/" + city.id + "?countryCode=" + searchParams.get("countryCode") + "&cityName=" + city.name}>
                            <div className="infoWrapper">
                                <span className="title">{city.name}</span>
                                <span className="subtitle">{city.servers_available} nodes</span>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
};

export default NodesCitiesScreen;