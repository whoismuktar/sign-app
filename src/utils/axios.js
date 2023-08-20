import axios from "axios";
// import $store from '@/store'

const baseURL = process.env.VUE_APP_BASE_URL;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    const isUnauthenticated = error?.response?.status === 401;

    if (isUnauthenticated) {
      console.log("clear");
      localStorage.clear();
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
