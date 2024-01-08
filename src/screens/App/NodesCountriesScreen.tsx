import { NavLink } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import APIService from "../../API/APIService";
import { useEffect, useState } from "react";
import APICountry from "../../API/models/APICountry";
import QuickConnect from "../../components/QuickConnect";
import ListSearchConnect from "../../components/ListSearchConnect";

const NodesCountriesScreen = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const updateCountries = () => {
    APIService.getCountries(localStorage.getItem("deviceToken")!)
      .then((response: any) => {
        setCountries(response.data.data);
        setFilteredCountries(response.data.data);
      })
      .catch((e: Error) => {
        //TODO: Unresolvable error
        console.log(e);
      });
  };

  useEffect(() => {
    updateCountries();
  }, []);

  const handleOnSearchTextChange = (value: string) => {
    setSearchText(value);
    const filtered = countries.filter(({ name }) => {
      return String(name).toLowerCase().includes(String(value).toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  return (
    <div className="nodesScreenContainer">
      <div className="topBar">
        <div className="buttonWrapper">
          <div className="spacer" />
        </div>
        <div className="titleWrapper">
          <span>Select a country</span>
        </div>
        <div className="buttonWrapper">
          <div className="spacer" />
        </div>
      </div>
      <ListSearchConnect
        searchText={searchText}
        onSearchTextChange={handleOnSearchTextChange}
      />

      <div className="list">
        {filteredCountries.map((country: APICountry, index) => {
          return (
            <NavLink
              key={`${index}-${country}`}
              className="location"
              to={
                "/app/nodes/countries/" +
                country.id +
                "?countryCode=" +
                country.code
              }
            >
              <div className="imageWrapper">
                <ReactCountryFlag
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                  countryCode={country.code.toUpperCase()}
                  svg
                />
              </div>
              <div className="infoWrapper">
                <span className="title">{country.name}</span>
                <span className="subtitle">
                  {country.servers_available} nodes
                </span>
              </div>
              <QuickConnect />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default NodesCountriesScreen;
