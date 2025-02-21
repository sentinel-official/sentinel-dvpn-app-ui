export const sortByKey = (array = [], key = "", reverse = false) => {
  if (array.length > 0) {
    if (reverse) {
      return array.sort((a, b) => b[String(key)].localeCompare(a[String(key)]));
    }
    return array.sort((a, b) => a[String(key)].localeCompare(b[String(key)]));
  }
  return [];
};
