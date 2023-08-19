const getTokenField = (field) => {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    return JSON.parse(jwt)[field];
  }

  throw new Error("Jwt is missing");
};

const getAccessesToken = () => {
  return getTokenField("accessesToken");
};

const getRefreshToken = () => {
  return getTokenField("refreshToken");
};

export { getAccessesToken, getRefreshToken };
