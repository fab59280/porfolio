import AddresseAPI from "../api/addressesApi";

const CREATING_ADDRESSE          = "CREATING_ADDRESSE",
  CREATING_ADDRESSE_SUCCESS  = "CREATING_ADDRESSE_SUCCESS",
  CREATING_ADDRESSE_ERROR    = "CREATING_ADDRESSE_ERROR",
  FETCHING_ADDRESSES         = "FETCHING_ADDRESSES",
  FETCHING_CONTACTS          = "FETCHING_CONTACTS",
  FETCHING_ADDRESSES_SUCCESS = "FETCHING_ADDRESSES_SUCCESS",
  FETCHING_CONTACTS_SUCCESS  = "FETCHING_CONTACTS_SUCCESS",
  FETCHING_ADDRESSE_SUCCESS  = "FETCHING_ADDRESSE_SUCCESS",
  FETCHING_ADDRESSES_ERROR   = "FETCHING_ADDRESSES_ERROR",
  UPDATING_ADDRESSE          = "UPDATING_ADDRESSE",
  UPDATING_ADDRESSE_SUCCESS  = "UPDATING_ADDRESSE_SUCCESS",
  UPDATING_ADDRESSE_ERROR    = "UPDATING_ADDRESSE_ERROR";


export default {
  namespaced: true,
  state:      {
    isLoading: false,
    error:     null,
    addresses: [],
    addresse:  "",
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
    hasAddresses(state) {
      return state.addresses['hydra:member'].length > 0;
    },
    hasAddresse(state) {
      return state.addresse !== "";
    },
    addresses(state) {
      return state.addresses['hydra:member'];
    },
    addresse(state) {
      return state.addresse;
    },
    contacts(state) {
      return state.contacts;
    }
  },
  mutations:  {
    [CREATING_ADDRESSE](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [CREATING_ADDRESSE_SUCCESS](state, addresse) {
      state.isLoading = false;
      state.error     = null;
      state.addresses.unshift(addresse);
    },
    [CREATING_ADDRESSE_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.addresses = [];
    },
    [UPDATING_ADDRESSE](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [UPDATING_ADDRESSE_SUCCESS](state, addresse) {
      state.isLoading = false;
      state.error     = null;
      state.addresse  = addresse;
    },
    [UPDATING_ADDRESSE_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.addresse  = "";
    },
    [FETCHING_ADDRESSES](state) {
      state.isLoading = true;
      state.error     = null;
      state.addresses = [];
    },
    [FETCHING_CONTACTS](state) {
      state.isLoading = true;
      state.error     = null;
      state.contacts  = [];
    },
    [FETCHING_ADDRESSES_SUCCESS](state, addresses) {
      state.isLoading = false;
      state.error     = null;
      state.addresses = addresses;
    },
    [FETCHING_ADDRESSE_SUCCESS](state, addresse) {
      state.isLoading = false;
      state.error     = null;
      state.addresse  = addresse;
    },
    [FETCHING_CONTACTS_SUCCESS](state) {
      state.isLoading = false;
      state.error     = null;
      state.contacts  = [];
    },
    [FETCHING_ADDRESSES_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.addresses = [];
    }
  },
  actions:    {
    async create({commit}, addresse) {
      commit(CREATING_ADDRESSE);
      try {
        let response = await AddresseAPI.create(addresse);
        commit(CREATING_ADDRESSE_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(CREATING_ADDRESSE_ERROR, error);
        return null;
      }
    },
    async findAll({commit}) {
      commit(FETCHING_ADDRESSES);
      try {
        let response = await AddresseAPI.findAll();
        commit(FETCHING_ADDRESSES_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_ADDRESSES_ERROR, error);
        return null;
      }
    },
    async findById({commit}, id) {
      commit(FETCHING_ADDRESSES);
      try {
        let response = await AddresseAPI.findOneById(id);
        commit(FETCHING_ADDRESSE_SUCCESS, response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_ADDRESSES_ERROR, error);
        return null;
      }
    },
    async findContacts({commit}, url) {
      commit(FETCHING_CONTACTS);
      try {
        let response                 = await AddresseAPI.findSubResource(url);
        response.data.is_initialized = true;
        commit(FETCHING_CONTACTS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_ADDRESSES_ERROR, error);
        return null;
      }
    },
    async update({commit}, data) {
      commit(UPDATING_ADDRESSE);
      try {
        let response = await AddresseAPI.update(data);
        commit(UPDATING_ADDRESSE_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(UPDATING_ADDRESSE_ERROR, error);
        return null;
      }
    }
  }
};
