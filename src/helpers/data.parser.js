import { arrayOfObjectsSort } from "./arrayOfObjects.sort";

export const parseAccountBalance = (balances = []) => {
  let total = 0;
  balances.forEach((b) => {
    if (b.denom === "udvpn") {
      total += Number.parseInt(b.amount);
    }
  });
  return total;
};

export const parsePlans = (plans = []) => {
  let amount = 0;
  let providerAddress = "";

  plans.forEach((p) => {
    if (p.id === "6") {
      providerAddress = p.providerAddress;
      amount = parseAccountBalance(p.prices);
    }
  });

  return { amount, providerAddress };
};

export const parseSubscriptions = (subscriptionsGot = []) => {
  let subscriptions = [];
  subscriptionsGot.forEach((s) => {
    if (s.base.status === "STATUS_ACTIVE") {
      subscriptions.push({ planId: s.planId, denom: s.denom, ...s.base });
    }
  });
  subscriptions = arrayOfObjectsSort(subscriptions, "inactiveAt", true);
  if (subscriptions && subscriptions.length > 0) {
    return subscriptions[0];
  }
  return {};
};

export const parseCountriesList = (list = [], protocols = "") => {
  const result = [];
  list.forEach((item) => {
    const index = result.findIndex((pushed) => pushed.id === item.id);
    if (index === -1) {
      result.push({
        id: item.id,
        name: item.name,
        code: item.code,
        servers_available: item.servers_available,
        protocols,
      });
      return;
    } else {
      const total = result[index].servers_available + item.servers_available;
      result[index] = { ...result[index], servers_available: total };
      return;
    }
  });
  return arrayOfObjectsSort(result, "name");
};

export const parseCitiesList = (list = [], country = {}, protocols = "") => {
  const result = [];
  list.forEach((item) => {
    if (item) {
      const index = result.findIndex((pushed) => pushed.id === item.id);
      if (index === -1) {
        result.push({
          id: item.id,
          name: item.name,
          country: country.name,
          code: country.code,
          country_id: country.id,
          servers_available: item.servers_available,
          protocols,
        });
        return;
      } else {
        const total = result[index].servers_available + item.servers_available;
        result[index] = { ...result[index], servers_available: total };
        return;
      }
    }
  });

  return arrayOfObjectsSort(result, "name");
};

export const parseServersList = (list = [], city = {}, protocols = []) => {
  const result = [];
  if (protocols.length <= 1) {
    list.forEach((l) => {
      result.push({
        ...l,
        city: city.name,
        country: city.country,
        code: city.code,
        country_id: city.country_id,
      });
    });
  } else {
    list.forEach((item) => {
      if (item) {
        result.push({
          ...item,
          city: city.name,
          country: city.name,
          code: city.code,
          country_id: city.country_id,
        });
        return;
      }
    });
  }
  return arrayOfObjectsSort(result, "name");
};
