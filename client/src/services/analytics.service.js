import api from "../api/axios";

export const getAnalytics = async () => {
  const response = await api.get("/links/analytics");
  return response.data;
};