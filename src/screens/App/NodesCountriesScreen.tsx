import {NavLink} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import APIService from "../../API/APIService";
import {useEffect, useState} from "react";
import APICountry from "../../API/models/APICountry";

const NodesCountriesScreen = () => {

    const [countries, setCountries] = useState([]);

    const updateCountries = () => {
        APIService.getCountries(localStorage.getItem("deviceToken")!).then((response: any) => {
            setCountries(response.data.data);
        }).catch((e: Error) => {
            //TODO: Unresolvable error
            console.log(e);
        })
    }

    useEffect(() => {
        updateCountries();
    }, []);

    return (
        <div className="nodesScreenContainer">
            <div className="topBar">
                <div className="buttonWrapper">
                    <div className="spacer"/>
                </div>
                <div className="titleWrapper">
                    <span>Select a country</span>
                </div>
                <div className="buttonWrapper">
                    <div className="spacer"/>
                </div>
            </div>

            <div className="list">
                {countries.map((country: APICountry, index) => {
                    return (
                        <NavLink className="location" to={"/app/nodes/countries/" + country.id + "?countryCode=" + country.code}>
                            <div className="imageWrapper">
                                <ReactCountryFlag countryCode={country.code.toUpperCase()} svg/>
                            </div>
                            <div className="infoWrapper">
                                <span className="title">{country.name}</span>
                                <span className="subtitle">{country.servers_available} nodes</span>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
};

export default NodesCountriesScreen;