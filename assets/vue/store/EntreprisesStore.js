import EntrepriseAPI from "../api/entreprisesApi";

const CREATING_ENTREPRISE      = "CREATING_ENTREPRISE",
  CREATING_ENTREPRISE_SUCCESS  = "CREATING_ENTREPRISE_SUCCESS",
  CREATING_ENTREPRISE_ERROR    = "CREATING_ENTREPRISE_ERROR",
  FETCHING_ENTREPRISES         = "FETCHING_ENTREPRISES",
  FETCHING_CONTACTS            = "FETCHING_CONTACTS",
  FETCHING_ENTREPRISES_SUCCESS = "FETCHING_ENTREPRISES_SUCCESS",
  FETCHING_CONTACTS_SUCCESS    = "FETCHING_CONTACTS_SUCCESS",
  FETCHING_ENTREPRISE_SUCCESS  = "FETCHING_ENTREPRISE_SUCCESS",
  FETCHING_ENTREPRISES_ERROR   = "FETCHING_ENTREPRISES_ERROR",
  UPDATING_ENTREPRISE          = "UPDATING_ENTREPRISE",
  UPDATING_ENTREPRISE_SUCCESS  = "UPDATING_ENTREPRISE_SUCCESS",
  UPDATING_ENTREPRISE_ERROR    = "UPDATING_ENTREPRISE_ERROR",
  DELETING_ENTREPRISE          = "DELETING_ENTREPRISE",
  DELETING_ENTREPRISE_SUCCESS  = "DELETING_ENTREPRISE_SUCCESS",
  DELETING_ENTREPRISE_ERROR    = "DELETING_ENTREPRISE_ERROR";


export default {
  namespaced: true,
  state:      {
    isLoading: false,
    error:     null,
    entreprises:   [],
    entreprise: "",
    contacts: []
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
    hasEntreprises(state) {
      return state.entreprises['hydra:member'].length > 0;
    },
    hasEntreprise(state) {
      return state.entreprise !== "";
    },
    entreprises(state) {
      return state.entreprises['hydra:member'];
    },
    entreprise(state) {
      return state.entreprise;
    },
    contacts(state) {
      return state.contacts;
    }
  },
  mutations:  {
    [CREATING_ENTREPRISE](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [CREATING_ENTREPRISE_SUCCESS](state, entreprise) {
      state.isLoading = false;
      state.error     = null;
      state.entreprises['hydra:member'].unshift(entreprise);
    },
    [CREATING_ENTREPRISE_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.entreprises   = [];
    },
    [UPDATING_ENTREPRISE](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [UPDATING_ENTREPRISE_SUCCESS](state, entreprise) {
      state.isLoading = false;
      state.error     = null;
      state.entreprise = entreprise;
    },
    [UPDATING_ENTREPRISE_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.entreprise   = "";
    },
    [FETCHING_ENTREPRISES](state) {
      state.isLoading = true;
      state.error     = null;
      state.entreprises   = [];
    },
    [FETCHING_CONTACTS](state) {
      state.isLoading = true;
      state.error     = null;
      state.contacts   = [];
    },
    [FETCHING_ENTREPRISES_SUCCESS](state, entreprises) {
      state.isLoading = false;
      state.error     = null;
      state.entreprises   = entreprises;
    },
    [FETCHING_ENTREPRISE_SUCCESS](state, entreprise) {
      state.isLoading = false;
      state.error     = null;
      state.entreprise   = entreprise;
    },
    [FETCHING_CONTACTS_SUCCESS](state) {
      state.isLoading = false;
      state.error     = null;
      state.contacts   = [];
    },
    [FETCHING_ENTREPRISES_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.entreprises   = [];
    },
    [DELETING_ENTREPRISE](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [DELETING_ENTREPRISE_SUCCESS](state, index) {
      state.isLoading = false;
      state.error     = null;
      state.entreprises['hydra:member'].splice(index, 1);
    },
    [DELETING_ENTREPRISE_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
    },
  },
  actions:    {
    async create({commit}, entreprise) {
      commit(CREATING_ENTREPRISE);
      try {
        let response = await EntrepriseAPI.create(entreprise);
        commit(CREATING_ENTREPRISE_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(CREATING_ENTREPRISE_ERROR, error);
        return null;
      }
    },
    async findAll({commit}) {
      commit(FETCHING_ENTREPRISES);
      try {
        let response = await EntrepriseAPI.findAll();
        commit(FETCHING_ENTREPRISES_SUCCESS, response.data);
        response.data['hydra:member'].forEach(entreprise => {
          if(entreprise.address === undefined) {
            entreprise.address = {
              address :'',
              postcode:'',
              city:'',
              country:''
            }
          }
          if(entreprise.phone === undefined) {
            entreprise.phone = {
              telephone :'',
              type:''
            }
          }
        });
        return response.data;
      } catch (error) {
        commit(FETCHING_ENTREPRISES_ERROR, error);
        return null;
      }
    },
    async findById({commit}, id) {
      commit(FETCHING_ENTREPRISES);
      try {
        let response = await EntrepriseAPI.findOneById(id);
        commit(FETCHING_ENTREPRISE_SUCCESS, response.data);
        if(response.data.address === undefined) {
          response.data.address = {
            address :'',
            postcode:'',
            city:'',
            country:''
          }
        }
        if(response.data.phone === undefined) {
          response.data.phone = {
            telephone :'',
            type:''
          }
        }
        return response.data;
      } catch (error) {
        commit(FETCHING_ENTREPRISES_ERROR, error);
        return null;
      }
    },
    async findContacts({commit}, url) {
      commit(FETCHING_CONTACTS);
      try {
        let response = await EntrepriseAPI.findSubResource(url);
        response.data.is_initialized = true;
        commit(FETCHING_CONTACTS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_ENTREPRISES_ERROR, error);
        return null;
      }
    },
    async update({commit}, data) {
      commit(UPDATING_ENTREPRISE);
      try {
        let response = await EntrepriseAPI.update(data);
        commit(UPDATING_ENTREPRISE_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(UPDATING_ENTREPRISE_ERROR, error);
        return null;
      }
    },
    async delete({commit}, data) {
      commit(DELETING_ENTREPRISE);
      try {
        let response = await EntrepriseAPI.delete(data.entreprise);
        commit(DELETING_ENTREPRISE_SUCCESS, data.index);
        return response.data;
      } catch (error) {
        commit(DELETING_ENTREPRISE_ERROR, error);
      }
    }
  }
};
