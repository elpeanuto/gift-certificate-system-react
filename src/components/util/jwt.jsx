import { getRefreshedToken } from "../api/jwt/api";

const getTokenField = (field) => {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    return JSON.parse(jwt)[field];
  }

  throw new Error("Jwt is missing");
};

const setToken = (jwtObject) => {
  if (jwtObject && jwtObject.accessToken && jwtObject.refreshToken) {
    try {
      const jwtString = JSON.stringify(jwtObject);
      localStorage.setItem("jwt", jwtString);
    } catch (error) {
      window.alert("Error converting JWT object to string:", error);
    }
  } else {
    window.alert("Invalid JWT object format");
  }
};

const getAccessToken = () => {
  return getTokenField("accessToken");
};

const getRefreshToken = () => {
  return getTokenField("refreshToken");
};

const refreshToken = async () => {
  setToken(await getRefreshedToken(getRefreshToken()));
};

export { getAccessToken, getRefreshToken, setToken, refreshToken };
