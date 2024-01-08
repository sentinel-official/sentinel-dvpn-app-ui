import { NavLink, useParams, useSearchParams } from "react-router-dom";
import APIService from "../../API/APIService";
import { useEffect, useState } from "react";
import APICity from "../../API/models/APICity";
import QuickConnect from "../../components/QuickConnect";
import ListSearchConnect from "../../components/ListSearchConnect";

const NodesCitiesScreen = () => {
  let { countryId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchText, setSearchText] = useState("");

  const updateCities = () => {
    APIService.getCities(localStorage.getItem("deviceToken")!, countryId!)
      .then((response: any) => {
        setCities(response.data.data);
        setFilteredCities(response.data.data);
      })
      .catch((e: Error) => {
        //TODO: Unresolvable error
        console.log(e);
      });
  };

  useEffect(() => {
    updateCities();
  }, []);

  const handleOnSearchTextChange = (value: string) => {
    setSearchText(value);
    const filtered = cities.filter(({ name }) => {
      return String(name).toLowerCase().includes(String(value).toLowerCase());
    });
    setFilteredCities(filtered);
  };

  return (
    <div className="nodesScreenContainer">
      <div className="topBar">
        <div className="buttonWrapper">
          <NavLink to={"/app/nodes"} className="backButton" />
        </div>
        <div className="titleWrapper">
          <span>Select a city</span>
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
        {filteredCities.map((city: APICity, index) => {
          return (
            <NavLink
              id={"city-" + index}
              key={`${index}-${city}`}
              className="location"
              to={
                "/app/nodes/countries/" +
                countryId +
                "/cities/" +
                city.id +
                "?countryCode=" +
                searchParams.get("countryCode") +
                "&cityName=" +
                city.name
              }
            >
              <div className="infoWrapper">
                <span className="title">{city.name}</span>
                <span className="subtitle">{city.servers_available} nodes</span>
              </div>
              <QuickConnect />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default NodesCitiesScreen;
