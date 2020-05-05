import TechnosAPI from "../api/technosApi";

const CREATING_TECHNO      = "CREATING_TECHNO",
  CREATING_TECHNO_SUCCESS  = "CREATING_TECHNO_SUCCESS",
  CREATING_TECHNO_ERROR    = "CREATING_TECHNO_ERROR",
  FETCHING_TECHNOS         = "FETCHING_TECHNOS",
  FETCHING_TECHNOS_SUCCESS = "FETCHING_TECHNOS_SUCCESS",
  FETCHING_TECHNOS_ERROR   = "FETCHING_TECHNOS_ERROR";

export default {
  namespaced: true,
  state:      {
    isLoading: false,
    error:     null,
    technos:   []
  },
  getters:    {
    isLoading(state) {
      return state.isLoading;
    },
    hasError(state) {
      return state.error !== null;
    },
    error(state) {
      return state.error;
    },
    hasTechnos(state) {
      return state.technos.length > 0;
    },
    technos(state) {
      return state.technos;
    }
  },
  mutations:  {
    [CREATING_TECHNO](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [CREATING_TECHNO_SUCCESS](state, techno) {
      state.isLoading = false;
      state.error     = null;
      state.technos.unshift(techno);
    },
    [CREATING_TECHNO_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.technos   = [];
    },
    [FETCHING_TECHNOS](state) {
      state.isLoading = true;
      state.error     = null;
      state.technos   = [];
    },
    [FETCHING_TECHNOS_SUCCESS](state, technos) {
      state.isLoading = false;
      state.error     = null;
      state.technos   = technos;
    },
    [FETCHING_TECHNOS_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.technos   = [];
    }
  },
  actions:    {
    async create({commit}, techno) {
      commit(CREATING_TECHNO);
      try {
        console.log(techno);
        let response = await TechnosAPI.create(techno);
        commit(CREATING_TECHNO_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(CREATING_TECHNO_ERROR, error);
        return null;
      }
    },
    async findAll({commit}) {
      commit(FETCHING_TECHNOS);
      try {
        let response = await TechnosAPI.findAll();
        commit(FETCHING_TECHNOS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_TECHNOS_ERROR, error);
        return null;
      }
    }
  }
};
