export const isVersionGreater = (userVersion, onlineVersion) => {
  const online = onlineVersion.split(".");
  const user = userVersion.split(".");

  for (let i = 0; i < Math.max(online.length, user.length); i++) {
    const numOnline = parseInt(online[i]) || 0;
    const numUser = parseInt(user[i]) || 0;
    if (numOnline === numUser) {
      continue;
    }
    if (numUser < numOnline) {
      return true;
    }
    return false;
  }
};
