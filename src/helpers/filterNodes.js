export const filterNodesByCountry = (nodes, countryId = "") => {
  if (countryId && countryId.length > 0) {
    return Object.values(nodes).filter((node) => {
      return (
        String(node.country_id).toLowerCase() ===
        String(countryId).toLowerCase()
      );
    });
  }
};

export const filterNodesByCity = (theNodes, cityId = "") => {
  if (cityId && cityId.length > 0) {
    const nodes = Object.values(theNodes);
    return Object.values(nodes).filter((node) => {
      return (
        String(node.city_id).toLowerCase() === String(cityId).toLowerCase()
      );
    });
  }
  return theNodes;
};
