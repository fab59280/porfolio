import LoginAPI from "../api/loginApi";
import loginApi from "../api/loginApi";

const LOGIN         = "LOGIN",
  LOGIN_SUCCESS     = "LOGIN_SUCCESS",
  LOGIN_ERROR       = "LOGIN_ERROR";

export default {
  namespaced: true,
  state:      {
    isLoading:        false,
    error:            null,
    user:             null,
    iri:              null,
    is_authenticated: false
  },
  getters:    {
    hasError(state) {
      return state.error !== null;
    },
    error(state) {
      return state.error;
    },
    isAuthenticated(state) {
      return state.is_authenticakted;
    },
    user(state) {
      return state.user;
    }
  },
  mutations:  {
    [LOGIN](state) {
      state.isLoading        = true;
      state.error            = null;
      state.is_authenticated = false;
      state.user             = null;
    },
    [LOGIN_SUCCESS](state, data) {
      state.isLoading        = false;
      state.error            = null;
      state.is_authenticated = true;
      state.iri              = data;
    },
    [LOGIN_ERROR](state, error) {
      state.isLoading        = false;
      state.error            = error;
      state.user             = null;
      state.is_authenticated = false;
    },
  },
  actions:    {
    async login({commit}, data) {
      commit(LOGIN);
      try {
        let response = await LoginAPI.login(data);
        commit(LOGIN_SUCCESS, response.headers.location);
        return response.headers;
      } catch (error) {
        commit(LOGIN_ERROR, error.response.data.error );
        return {
          error: error.response.data.error
        };
      }
    },
    async getUser({state}) {
      try {
        let response = await loginApi.find(state.iri);
        state.user = response.data;
        return response.data;
      } catch (e) {
        return {
          error: e.response.data.error
        }
      }
    }
  }
};
