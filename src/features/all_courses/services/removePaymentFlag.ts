export const removePaymentFlag = () => {
  const url = new URL(window.location.href);
  if (url.searchParams.has("payment")) {
    url.searchParams.delete("payment");
    window.history.replaceState({}, "", url);
  }
};
