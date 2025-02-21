export const filterCountriesByProtocol = (list = [], protocols = "") => {
  return list.filter((l) => {
    return l.protocols === protocols;
  });
};

export const filterCitiesByCountryId = (countryId, list, protocols) => {
  return list.filter((l) => {
    return (
      l.protocols === protocols &&
      Number.parseInt(l.countryId) === Number.parseInt(countryId)
    );
  });
};

export const filterServersByCity = (cityId, list, protocols = "") => {
  return list.filter((l) => {
    return (
      protocols.includes(l.protocol) &&
      Number.parseInt(l.cityId) === Number.parseInt(cityId)
    );
  });
};

const filterListByKey = (list = [], key, value) => {
  const filtered = list.filter((li) => {
    if (li[key].toString() === value.toString()) {
      return li;
    }
    return;
  });
  return filtered;
};

export default filterListByKey;
