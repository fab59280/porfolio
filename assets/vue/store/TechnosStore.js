import TechnosAPI from "../api/technosApi";

const CREATING_TECHNO      = "CREATING_TECHNO",
  CREATING_TECHNO_SUCCESS  = "CREATING_TECHNO_SUCCESS",
  CREATING_TECHNO_ERROR    = "CREATING_TECHNO_ERROR",
  FETCHING_TECHNOS         = "FETCHING_TECHNOS",
  FETCHING_TECHNOS_SUCCESS = "FETCHING_TECHNOS_SUCCESS",
  FETCHING_TECHNOS_ERROR   = "FETCHING_TECHNOS_ERROR",
  UPDATING_TECHNO          = "UPDATING_TECHNO",
  UPDATING_TECHNO_SUCCESS  = "UPDATING_TECHNO_SUCCESS",
  UPDATING_TECHNO_ERROR    = "UPDATING_TECHNO_ERROR",
  DELETING_TECHNO          = "DELETING_TECHNO",
  DELETING_TECHNO_SUCCESS  = "DELETING_TECHNO_SUCCESS",
  DELETING_TECHNO_ERROR    = "DELETING_TECHNO_ERROR";

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
      state.technos.push(techno);
    },
    [CREATING_TECHNO_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
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
    },
    [UPDATING_TECHNO](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [UPDATING_TECHNO_SUCCESS](state, techno, index) {
      state.isLoading = false;
      state.error     = null;
      state.technos[index] = techno;
    },
    [UPDATING_TECHNO_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
    },
    [DELETING_TECHNO](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [DELETING_TECHNO_SUCCESS](state, index) {
      state.isLoading = false;
      state.error     = null;
      state.technos.splice(index, 1);
    },
    [DELETING_TECHNO_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
    },
  },
  actions:    {
    async create({commit}, techno) {
      commit(CREATING_TECHNO);
      try {
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
    },
    async update({commit}, data) {
      commit(UPDATING_TECHNO);
      try {
        let response = await TechnosAPI.update(data.techno);
        commit(UPDATING_TECHNO_SUCCESS, response.data, data.index);
        return response.data;
      } catch (error) {
        commit(UPDATING_TECHNO_ERROR, error);
      }
    },
    async delete({commit}, data) {
      commit(DELETING_TECHNO);
      try {
        let response = await TechnosAPI.delete(data.techno);
        commit(DELETING_TECHNO_SUCCESS, data.index);
        return response.data;
      } catch (error) {
        commit(DELETING_TECHNO_ERROR, error);
      }
    }
  }
};
