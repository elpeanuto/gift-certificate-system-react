import { getRefreshedToken } from "../api/jwt/api";

const getTokenField = (field) => {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    return JSON.parse(jwt)[field];
  }

  throw new Error("Jwt is missing");
};

const setToken = (jwtObject) => {
  console.log(jwtObject);

  if (jwtObject && jwtObject.accessToken && jwtObject.refreshToken) {
    try {
      const jwtString = JSON.stringify(jwtObject);
      localStorage.setItem("jwt", jwtString);
    } catch (error) {
      console.error("Error converting JWT object to string:", error);
    }
  } else {
    console.error("Invalid JWT object format");
  }
};

const getAccessToken = () => {
  return getTokenField("accessToken");
};

const getRefreshToken = () => {
  return getTokenField("refreshToken");
};

const refreshToken = async () => {
  console.log("refresh");
  setToken(await getRefreshedToken(getRefreshToken()));
};

export { getAccessToken, getRefreshToken, setToken, refreshToken };
