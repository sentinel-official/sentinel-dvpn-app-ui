import { arrayOfObjectsSort } from "./arrayOfObjects.sort";

export const getCitiesByCountryId = (countryId, list = [], protocols = "") => {
  const result = [];
  list.forEach((l) => {
    if (l.country_id === countryId) {
      if (protocols && protocols.length > 0 && protocols === l.protocols) {
        result.push(l);
        return;
      }
    }
  });
  return arrayOfObjectsSort(result, "name");
};

export const getCountriesByProtocol = (list = [], protocols = "") => {
  const result = [];
  list.forEach((l) => {
    if (protocols && protocols.length > 0 && protocols === l.protocols) {
      result.push(l);
      return;
    }
  });
  return arrayOfObjectsSort(result, "name");
};
