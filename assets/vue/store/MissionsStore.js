import MissionAPI from "../api/missionsApi";

const CREATING_MISSION          = "CREATING_MISSION",
  CREATING_MISSION_SUCCESS  = "CREATING_MISSION_SUCCESS",
  CREATING_MISSION_ERROR    = "CREATING_MISSION_ERROR",
  FETCHING_MISSIONS         = "FETCHING_MISSIONS",
  FETCHING_CONTACTS         = "FETCHING_CONTACTS",
  FETCHING_MISSIONS_SUCCESS = "FETCHING_MISSIONS_SUCCESS",
  FETCHING_CONTACTS_SUCCESS = "FETCHING_CONTACTS_SUCCESS",
  FETCHING_MISSION_SUCCESS  = "FETCHING_MISSION_SUCCESS",
  FETCHING_MISSIONS_ERROR   = "FETCHING_MISSIONS_ERROR",
  UPDATING_MISSION          = "UPDATING_MISSION",
  UPDATING_MISSION_SUCCESS  = "UPDATING_MISSION_SUCCESS",
  UPDATING_MISSION_ERROR    = "UPDATING_MISSION_ERROR";


export default {
  namespaced: true,
  state:      {
    isLoading: false,
    error:     null,
    missions:  [],
    mission:   "",
    contacts:  []
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
    hasMissions(state) {
      return state.missions['hydra:member'].length > 0;
    },
    hasMission(state) {
      return state.mission !== "";
    },
    missions(state) {
      return state.missions['hydra:member'];
    },
    mission(state) {
      return state.mission;
    },
    contacts(state) {
      return state.contacts;
    }
  },
  mutations:  {
    [CREATING_MISSION](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [CREATING_MISSION_SUCCESS](state, mission) {
      state.isLoading = false;
      state.error     = null;
      state.missions.unshift(mission);
    },
    [CREATING_MISSION_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.missions  = [];
    },
    [UPDATING_MISSION](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [UPDATING_MISSION_SUCCESS](state, mission) {
      state.isLoading = false;
      state.error     = null;
      state.mission   = mission;
    },
    [UPDATING_MISSION_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.mission   = "";
    },
    [FETCHING_MISSIONS](state) {
      state.isLoading = true;
      state.error     = null;
      state.missions  = [];
    },
    [FETCHING_CONTACTS](state) {
      state.isLoading = true;
      state.error     = null;
      state.contacts  = [];
    },
    [FETCHING_MISSIONS_SUCCESS](state, missions) {
      state.isLoading = false;
      state.error     = null;
      state.missions  = missions;
    },
    [FETCHING_MISSION_SUCCESS](state, mission) {
      state.isLoading = false;
      state.error     = null;
      state.mission   = mission;
    },
    [FETCHING_CONTACTS_SUCCESS](state) {
      state.isLoading = false;
      state.error     = null;
      state.contacts  = [];
    },
    [FETCHING_MISSIONS_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.missions  = [];
    }
  },
  actions:    {
    async create({commit}, mission) {
      commit(CREATING_MISSION);
      try {
        console.log(mission);
        let response = await MissionAPI.create(mission);
        commit(CREATING_MISSION_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(CREATING_MISSION_ERROR, error);
        return null;
      }
    },
    async findAll({commit}) {
      commit(FETCHING_MISSIONS);
      try {
        let response = await MissionAPI.findAll();
        commit(FETCHING_MISSIONS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_MISSIONS_ERROR, error);
        return null;
      }
    },
    async findById({commit}, id) {
      commit(FETCHING_MISSIONS);
      try {
        let response = await MissionAPI.findOneById(id);
        commit(FETCHING_MISSION_SUCCESS, response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_MISSIONS_ERROR, error);
        return null;
      }
    },
    async findContacts({commit}, url) {
      commit(FETCHING_CONTACTS);
      try {
        let response                 = await MissionAPI.findSubResource(url);
        response.data.is_initialized = true;
        commit(FETCHING_CONTACTS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_MISSIONS_ERROR, error);
        return null;
      }
    },
    async update({commit}, data) {
      commit(UPDATING_MISSION);
      try {
        let response = await MissionAPI.update(data);
        commit(UPDATING_MISSION_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(UPDATING_MISSION_ERROR, error);
        return null;
      }
    }
  }
};
