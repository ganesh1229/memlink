import api from "../api/axios";

export const createLink = async (data) => {
  const response = await api.post("/links", data);
  return response.data;
};

export const getLinks = async (
  page = 1,
  limit = 10
) => {
  const response = await api.get(
    `/links?page=${page}&limit=${limit}`
  );

  return response.data;
};

export const generateQRCode = async (id) => {
  const response = await api.get(
    `/links/${id}/qrcode`
  );

  return response.data;
};