import axios from "@/utils/axios";

export const getProfile = () => {
  return axios.get(`/user/profile`);
};
