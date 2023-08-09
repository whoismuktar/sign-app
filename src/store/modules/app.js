const state = {};

const getters = {};

const actions = {
  logOut({ commit }) {
    commit("setLogOut");
  },
};

const mutations = {
  setLogout() {
    console.log("user logged out");
    localStorage.clear()
  },
};

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== "production",
  state,
  getters,
  actions,
  mutations,
};
