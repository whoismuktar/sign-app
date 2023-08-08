import axios from "@/utils/axios";

export const register = (urlToken, data) => {
  return axios.post(`/register`, data);
};
