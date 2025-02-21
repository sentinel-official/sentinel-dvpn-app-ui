const isThereResponseCode = (str) => {
  let parts = str.split(`"code":`);

  if (parts && parts.length > 1) {
    const second = parts[1];
    const commaIndex = second.indexOf(",");
    if (commaIndex !== -1) {
      return second.substring(0, commaIndex).trim();
    }
    return second.substring(0, 2);
  }

  return 0;
};
export default isThereResponseCode;
