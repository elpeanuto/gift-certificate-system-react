import { getRefreshedToken } from "../api/jwt/api";

const getTokenField = (field) => {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    return JSON.parse(jwt)[field];
  } else {
    return null;
  }
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

const deleteToken = () => {
  localStorage.removeItem("jwt");
};

const getAccessToken = () => {
  return getTokenField("accessToken");
};

const getRefreshToken = () => {
  return getTokenField("refreshToken");
};

const refreshToken = async () => {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    const newToken = await getRefreshedToken(refreshToken);

    setToken(newToken);
  }
};

export { getAccessToken, getRefreshToken, setToken, refreshToken, deleteToken };
