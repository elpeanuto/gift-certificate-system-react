import { getAccessToken, refreshToken } from "../util/jwt";

const MAX_REFRESH_ATTEMPTS = 1;

const request = async (url, options, refreshAttempts = 0) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    if (response.status === 401) {
      if (refreshAttempts < MAX_REFRESH_ATTEMPTS) {
        await refreshToken();
        options.headers.authorization = `Bearer ${getAccessToken()}`;
        return request(url, options, refreshAttempts + 1);
      } else {
        throw new Error("Maximum token refresh attempts reached.");
      }
    } else {
      throw new Error(data.errorMessage);
    }
  } catch (error) {
    throw error;
  }
};

export default request;