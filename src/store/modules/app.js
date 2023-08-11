const state = {};

const getters = {
  signatureTypes: () => {
    const options =
      "Initial|Signature|NotaryStamp|NotaryTraditionalSeal|NotaryDigitalSeal|CompanyStamp|CompanySeal|Photograph|Camera|LeftThumbFinger|LeftPointerFinger|LeftMiddleFinger|LeftRingFinger|LeftPinkyFinger|LeftPinkyFinger|RightThumbFinger|RightPointerFinger|RightMiddleFinger|RightRingFinger|RightPinkyFinger|Text";

      const vals = options.split("|")
    return vals;
  },
};

const actions = {
  logOut({ commit }) {
    commit("setLogOut");
  },
};

const mutations = {
  setLogout() {
    localStorage.clear();
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
