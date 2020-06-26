import LoginAPI from "../api/loginApi";

const LOGIN         = "LOGIN",
  LOGIN_SUCCESS     = "LOGIN_SUCCESS",
  LOGIN_ERROR       = "LOGIN_ERROR",
  PROVIDING_DATA_ON_REFRESH_SUCCESS = "PROVIDING_DATA_ON_REFRESH_SUCCESS";

export default {
  namespaced: true,
  state:      {
    isLoading:        false,
    error:            null,
    user:             null,
    iri:              null,
    isAuthenticated: false
  },
  getters:    {
    hasError(state) {
      return state.error !== null;
    },
    error(state) {
      return state.error;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    user(state) {
      return state.user;
    }
  },
  mutations:  {
    [LOGIN](state) {
      state.isLoading        = true;
      state.error            = null;
      state.isAuthenticated = false;
      state.user             = null;
    },
    [LOGIN_SUCCESS](state, data) {
      state.isLoading        = false;
      state.error            = null;
      state.isAuthenticated  = data.isAuthenticated;
      state.user             = JSON.parse(data.user);
    },
    [LOGIN_ERROR](state, error) {
      state.isLoading        = false;
      state.error            = error;
      state.user             = null;
      state.isAuthenticated = false;
    },
    [PROVIDING_DATA_ON_REFRESH_SUCCESS](state, payload) {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = payload.isAuthenticated;
      state.user = payload.user;
    }
  },
  actions:    {
    async login({commit}, data) {
      commit(LOGIN);
      try {
        let response = await LoginAPI.login(data);
        commit(LOGIN_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(LOGIN_ERROR, error.response.data.error );
        return {
          error: error.response.data.error
        };
      }
    },
    onRefresh({commit}, payload) {
      commit(PROVIDING_DATA_ON_REFRESH_SUCCESS, payload);
    }
  }
};
