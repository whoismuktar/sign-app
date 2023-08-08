const state = {
  settings: {},
  genres: [],
  product_categories: [],
  public_relations_user: {},
};

const getters = {
  getCurrencies() {
    return [
      { title: "₦", value: "NGN" },
      { title: "$", value: "USD" },
    ];
  },
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== "production",
  state,
  getters,
  actions,
  mutations,
};
