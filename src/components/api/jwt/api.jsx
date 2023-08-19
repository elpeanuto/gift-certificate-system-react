import request from "../request";

const getToken = async (body) => {
  const url = "gift-certificate-system/auth/authenticate";
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
  const url = "gift-certificate-system/auth/refreshToken";
  const options = {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  };

  return request(url, options);
};

export { getToken, getRefreshedToken };
