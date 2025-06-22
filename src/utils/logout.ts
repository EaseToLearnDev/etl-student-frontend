const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/student";
};

export default logout;
