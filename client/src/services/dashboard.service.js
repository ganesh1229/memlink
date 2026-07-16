import api from "../api/axios";

export const getDashboardStats = async () => {
  const response = await api.get("/links/stats");
  return response.data;
};

export const getRecentLinks = async () => {
  const response = await api.get("/links?page=1&limit=5");
  return response.data;
};