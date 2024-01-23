export const segregateByKey = (list = [], key = "") => {
  const result = {};

  list.forEach((item) => {
    if (result[item[key]]) {
      result[item[key]].push(item);
    } else {
      result[item[key]] = [item];
    }
  });
  return result;
};

export const filterCountries = (countries = [], key = "") => {
  if (key && key.length > 0) {
    return countries.filter((country) => {
      return String(country.name)
        .toLowerCase()
        .includes(String(key).toLowerCase());
    });
  }
  return countries;
};

export const filterCities = (cities = [], key = "") => {
  if (key && key.length > 0) {
    return cities.filter((city) => {
      return String(city.name)
        .toLowerCase()
        .includes(String(key).toLowerCase());
    });
  }
  return cities;
};

export const filterNodes = (nodes = [], key = "") => {
  if (key && key.length > 0) {
    return nodes.filter((node) => {
      return (
        String(node.name).toLowerCase().includes(String(key).toLowerCase()) ||
        String(node.address).toLowerCase().includes(String(key).toLowerCase())
      );
    });
  }
  return nodes;
};