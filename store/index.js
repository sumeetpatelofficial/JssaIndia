import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = () => ({
  authenticated: false,
  signInUpDialogue: false,
  user: {
    uid: null,
    email: null,
  },
  userInfo: null,
  value: "abc",
});

export const mutations = {
  SET_USER(state, { authenticated, uid, email }) {
    state.authenticated = authenticated;
    state.user.uid = uid;
    state.user.email = email;
  },
  SET_USER_INFO(state, userInfo) {
    if (state.userInfo && userInfo) {
      state.userInfo = { ...state.userInfo, ...userInfo };
    } else {
      state.userInfo = userInfo;
    }
  },
  SET_VALUE(state, payload) {
    state.value = payload;
  },
};
export const actions = {
  onAuthStateChangedAction: ({ commit, dispatch }, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
      const [authenticated, uid, email] = [false, null, null];
      commit("SET_USER", { authenticated, uid, email });
      commit("SET_USER_INFO", null);
    } else {
      // Do something with the authUser and the claims object...
      if (authUser.emailVerified) {
        const authenticated = true;
        const { uid, email } = authUser;
        commit("SET_USER", { authenticated, uid, email });
        dispatch("getUserInfo");
      }
    }
  },

  getUserInfo({ commit, state }) {
    const user = this.$fire.firestore.collection("users").doc(state.user.uid);
    user
      .get()
      .then((doc) => {
        if (doc.exists) {
          commit("SET_USER_INFO", doc.data());
        } else {
          commit("SET_USER_INFO", null);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
        commit("SET_USER_INFO", null);
      });
  },

  updateValue({ commit }, payload) {
    commit("SET_VALUE", payload);
  },
};
