import { request, requestWithToken } from "../request";

const getToken = async (body) => {
  const url = "auth/authenticate";
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  };

  return request(url, options);
};

const getRefreshedToken = async (jwt) => {
  const url = "auth/refreshToken";
  const options = {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  };

  return requestWithToken(url, options);
};

const isAdmin = async (jwt) => {
  const url = "auth/isAdmin";
  const options = {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  };

  return requestWithToken(url, options);
};

export { getToken, getRefreshedToken, isAdmin };
