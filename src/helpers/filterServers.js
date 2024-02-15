import { arrayOfObjectsSort } from "./arrayOfObjects.sort";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const getRandomNode = (nodes = []) => {
  const randomNumber = getRandomInt([...nodes].length);
  return nodes[randomNumber];
};

export const getServersByCity = (city, list = [], protocols = []) => {
  const result = [];
  list.forEach((l) => {
    if (
      l.country_id === city.country_id &&
      l.city_id === city.id &&
      protocols.includes(l.protocol)
    ) {
      result.push(l);
    }
  });
  return arrayOfObjectsSort(result, "name");
};

export const getServersByCountry = (country, list = []) => {
  const result = [];
  list.forEach((l) => {
    if (l.country_id === country.id) {
      result.push(l);
    }
  });
  return arrayOfObjectsSort(result, "name");
};

export const getServersByCityAndCountryId = (cityId, countryId, list = []) => {
  const result = [];
  list.forEach((l) => {
    if (
      Number.parseInt(l.country_id) === Number.parseInt(countryId) &&
      Number.parseInt(l.city_id) === Number.parseInt(cityId)
    ) {
      result.push(l);
    }
  });
  return arrayOfObjectsSort(result, "name");
};

export const getServersByCountryId = (countryId, list = []) => {
  const result = [];
  list.forEach((l) => {
    if (Number.parseInt(l.country_id) === Number.parseInt(countryId)) {
      result.push(l);
    }
  });
  return arrayOfObjectsSort(result, "name");
};

export const getCitiesByCountry = (country = {}, cities = []) => {
  const result = [];

  cities.forEach((l) => {
    if (l.country_id === country.id) {
      result.push(l);
    }
  });
  return result;
};
