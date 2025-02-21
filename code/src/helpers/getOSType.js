export const getMobileOS = () => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua.toLowerCase())) {
    return "android";
  } else if (/iPad|iPhone|iPod/.test(ua) || /Macintosh/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    return "ios";
  }
  return "android";
};
