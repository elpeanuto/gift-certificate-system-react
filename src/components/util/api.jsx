const getCertificates = async (page, limit, jwt) => {
  try {
    const response = await fetch(
      `gift-certificate-system/giftCertificates?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${jwt}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else {
      throw new Error(data.errorMessage);
    }
  } catch (error) {
    throw error;
  }
};

const addCertificate = async (certificate, jwt) => {
  try {
    const response = await fetch(`gift-certificate-system/giftCertificates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(certificate),
    });

    const data = await response.json();

    if (response.status === 201) {
      window.alert("Cool");
    } else {
      throw new Error(data.errorMessage);
    }
  } catch (error) {
    throw error;
  }
};

const getToken = async (body) => {
  try {
    const response = await fetch("gift-certificate-system/auth/authenticate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const jwtData = await response.json();

    if (response.status === 200) {
      return jwtData;
    } else {
      throw new Error(jwtData.errorMessage);
    }
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

const refreshToken = async (jwt) => {
  try {
    const response = await fetch("gift-certificate-system/auth/refreshToken", {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });

    const jwtData = await response.json();

    if (response.status === 200) {
      return jwtData;
    } else {
      throw new Error(jwtData.errorMessage);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { getCertificates, addCertificate, getToken, refreshToken };
