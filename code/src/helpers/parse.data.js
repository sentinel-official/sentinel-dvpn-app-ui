import { APP_DENOM, PLAN_ID, STATUS_ACTIVE } from "@root/constants";
import { sortByKey } from "./sortListByKey";

export const parseCountriesList = (list = [], protocols = "") => {
  const result = [];
  list.forEach((item) => {
    const index = result.findIndex((pushed) => pushed.id === item.id);
    if (index === -1) {
      result.push({
        id: item.id,
        name: item.name,
        code: item.code,
        count: item.servers_available,
        protocols,
      });
      return;
    } else {
      const total = result[index].count + item.servers_available;
      result[index] = { ...result[index], count: total };
      return;
    }
  });
  return sortByKey(result, "name");
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
          countryName: country.name,
          countryCode: country.code,
          countryId: country.id,
          count: item.servers_available,
          protocols,
        });
        return;
      } else {
        const total = result[index].count + item.servers_available;
        result[index] = { ...result[index], count: total };
        return;
      }
    }
  });

  return sortByKey(result, "name");
};

export const parseServersList = (list = [], city = {}) => {
  const result = [];
  list.forEach((item) => {
    if (item) {
      result.push({
        id: item.id,
        name: item.name,
        address: item.address,
        isAvailable: item.is_available,
        latitude: item.latitude,
        longitude: item.longitude,
        remoteURL: item.remote_url,
        protocol: item.protocol,
        countryName: city.countryName,
        countryCode: city.countryCode,
        countryId: city.countryId,
        cityId: city.id,
        cityName: city.name,
      });
    }
  });

  return sortByKey(result, "name");
};

export const parseAccountBalance = (balances = []) => {
  let balance = 0;
  balances.forEach((bal) => {
    if (bal.denom === APP_DENOM) {
      balance += Number.parseInt(bal.amount);
    }
  });
  return balance;
};

export const filterPlan = (plans = []) => {
  let plan = {};
  plans.forEach((p) => {
    if (p.id?.toString() === PLAN_ID && p.status === STATUS_ACTIVE) {
      plan = {
        id: p.id,
        price: parseAccountBalance(p.prices),
        providerAddress: p.providerAddress,
        status: p.status,
        duration: p.duration,
      };
      return;
    }
  });

  return plan;
};

export const filterSubscription = (subscriptions = []) => {
  let subscription = "";
  subscriptions.forEach((s) => {
    if (
      s.denom === APP_DENOM &&
      s.planId === PLAN_ID &&
      s.base?.status === STATUS_ACTIVE
    ) {
      subscription = {
        id: s.base.id,
        planId: s.planId,
        status: s.base.status,
        denom: s.denom,
        inactiveAt: s.base.inactiveAt,
      };
      return;
    }
  });
  return subscription;
};

export const parsePlanDuration = (duration = "s") => {
  const d = Number.parseInt(duration.replace("s", ""));
  return Number.parseInt(d / 60 / 60 / 24);
};

export const parseRemaingDaysOfSubscription = (inactiveAt = "") => {
  if (inactiveAt && inactiveAt.length > 0) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const currentDate = new Date();
    const targetDate = new Date(inactiveAt);
    const remainingDays = Math.ceil(
      (targetDate.getTime() - currentDate.getTime()) / millisecondsPerDay
    );
    return remainingDays;
  }
  return 0;
};

export const parseWalletAddress = (str) => {
  if (str && str.length > 0)
    return str.slice(0, 10) + "..." + str.slice(-6, str.length);
  return "";
};

export const parseRecentServers = (
  recentServers = [],
  responses = [],
  addresses = []
) => {
  const data = [];

  addresses.forEach((address) => {
    const resp = responses.find((r) => r.address === address);
    const old = recentServers.find((r) => r.address === address);
    const updated = {
      ...old,
      isAvailable: resp.is_available,
    };
    data.push(updated);
  });
  return data;
};

export const parseDNSListResponse = (servers) => {
  const payload = servers.map((s) => ({ ...s, preferredName: s.name }));
  return payload;
};
