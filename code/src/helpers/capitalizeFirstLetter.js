const capitalizeFirstLetter = (string) => {
  if (string && string.length > 0)
    return string.charAt(0)?.toUpperCase() + string.slice(1);
  return "";
};

export default capitalizeFirstLetter;
