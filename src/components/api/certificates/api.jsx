import request from "../request";

const getCertificates = async (page, limit, jwt) => {
  const url = `gift-certificate-system/giftCertificates?page=${page}&limit=${limit}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${jwt}`,
    },
  };

  return request(url, options);
};

const addCertificate = async (certificate, jwt) => {
  const url = `gift-certificate-system/giftCertificates`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(certificate),
  };

  try {
    await request(url, options);
  } catch (error) {
    throw error;
  }
};

export { getCertificates, addCertificate };
