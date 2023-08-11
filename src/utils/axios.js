import axios from "axios";
// import $store from '@/store'

const baseURL = process.env.VUE_APP_BASE_URL;
const TOKEN = localStorage.getItem("auth_token");

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN && `Bearer ${TOKEN}`,
  },
});

// RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
