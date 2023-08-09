import axios from "@/utils/axios";

export const getProfile = () => {
  return axios.get(`/user/profile`);
};

export const uploadDoc = (base64Files) => {
  return axios.post({ files: base64Files });
};
