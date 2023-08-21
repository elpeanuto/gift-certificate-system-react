import { request, requestWithToken } from "../request";

const getCertificates = async (page, limit) => {
  const url = `gift-certificate-system/giftCertificates?page=${page}&limit=${limit}`;

  return request(url, null);
};

const getCertificatesWithFilter = async (url, page, limit) => {
  const updatedUrl = `${url}&page=${page}&limit=${limit}`;

  return request(updatedUrl, null);
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
    await requestWithToken(url, options);
  } catch (error) {
    throw error;
  }
};

const deleteCertificate = async (deleteLink, jwt) => {
  const modifiedDeleteUrl = deleteLink.replace("http://localhost:8080/", "");

  const options = {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  };

  try {
    await requestWithToken(modifiedDeleteUrl, options);
  } catch (error) {
    throw error;
  }
};

const updateCertificate = async (certificate, updateLink, jwt) => {
  const modifiedUpdateLink = updateLink.replace("http://localhost:8080/", "");
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(certificate),
  };

  try {
    await requestWithToken(modifiedUpdateLink, options);
  } catch (error) {
    throw error;
  }
};

export {
  getCertificates,
  addCertificate,
  deleteCertificate,
  updateCertificate,
  getCertificatesWithFilter,
};
