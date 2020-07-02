import DateAPI from "../api/datesApi";

const CREATING_DATE          = "CREATING_DATE",
  CREATING_DATE_SUCCESS  = "CREATING_DATE_SUCCESS",
  CREATING_DATE_ERROR    = "CREATING_DATE_ERROR",
  FETCHING_DATES         = "FETCHING_DATES",
  FETCHING_CONTACTS          = "FETCHING_CONTACTS",
  FETCHING_DATES_SUCCESS = "FETCHING_DATES_SUCCESS",
  FETCHING_CONTACTS_SUCCESS  = "FETCHING_CONTACTS_SUCCESS",
  FETCHING_DATE_SUCCESS  = "FETCHING_DATE_SUCCESS",
  FETCHING_DATES_ERROR   = "FETCHING_DATES_ERROR",
  UPDATING_DATE          = "UPDATING_DATE",
  UPDATING_DATE_SUCCESS  = "UPDATING_DATE_SUCCESS",
  UPDATING_DATE_ERROR    = "UPDATING_DATE_ERROR";


export default {
  namespaced: true,
  state:      {
    isLoading: false,
    error:     null,
    dates: [],
    date:  "",
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
    hasDates(state) {
      return state.dates['hydra:member'].length > 0;
    },
    hasDate(state) {
      return state.date !== "";
    },
    dates(state) {
      return state.dates['hydra:member'];
    },
    date(state) {
      return state.date;
    },
    contacts(state) {
      return state.contacts;
    }
  },
  mutations:  {
    [CREATING_DATE](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [CREATING_DATE_SUCCESS](state, date) {
      state.isLoading = false;
      state.error     = null;
      state.dates.unshift(date);
    },
    [CREATING_DATE_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.dates = [];
    },
    [UPDATING_DATE](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [UPDATING_DATE_SUCCESS](state, date) {
      state.isLoading = false;
      state.error     = null;
      state.date  = date;
    },
    [UPDATING_DATE_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.date  = "";
    },
    [FETCHING_DATES](state) {
      state.isLoading = true;
      state.error     = null;
      state.dates = [];
    },
    [FETCHING_CONTACTS](state) {
      state.isLoading = true;
      state.error     = null;
      state.contacts  = [];
    },
    [FETCHING_DATES_SUCCESS](state, dates) {
      state.isLoading = false;
      state.error     = null;
      state.dates = dates;
    },
    [FETCHING_DATE_SUCCESS](state, date) {
      state.isLoading = false;
      state.error     = null;
      state.date  = date;
    },
    [FETCHING_CONTACTS_SUCCESS](state) {
      state.isLoading = false;
      state.error     = null;
      state.contacts  = [];
    },
    [FETCHING_DATES_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.dates = [];
    }
  },
  actions:    {
    async create({commit}, date) {
      commit(CREATING_DATE);
      try {
        console.log(date);
        let response = await DateAPI.create(date);
        commit(CREATING_DATE_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(CREATING_DATE_ERROR, error);
        return null;
      }
    },
    async findAll({commit}) {
      commit(FETCHING_DATES);
      try {
        let response = await DateAPI.findAll();
        commit(FETCHING_DATES_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_DATES_ERROR, error);
        return null;
      }
    },
    async findById({commit}, id) {
      commit(FETCHING_DATES);
      try {
        let response = await DateAPI.findOneById(id);
        commit(FETCHING_DATE_SUCCESS, response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_DATES_ERROR, error);
        return null;
      }
    },
    async findContacts({commit}, url) {
      commit(FETCHING_CONTACTS);
      try {
        let response                 = await DateAPI.findSubResource(url);
        response.data.is_initialized = true;
        commit(FETCHING_CONTACTS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_DATES_ERROR, error);
        return null;
      }
    },
    async update({commit}, data) {
      commit(UPDATING_DATE);
      try {
        let response = await DateAPI.update(data);
        commit(UPDATING_DATE_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(UPDATING_DATE_ERROR, error);
        return null;
      }
    }
  }
};
