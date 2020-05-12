import ContactsAPI from "../api/contactsApi";

const CREATING_CONTACT      = "CREATING_CONTACT",
  CREATING_CONTACT_SUCCESS  = "CREATING_CONTACT_SUCCESS",
  CREATING_CONTACT_ERROR    = "CREATING_CONTACT_ERROR",
  FETCHING_CONTACTS         = "FETCHING_CONTACTS",
  FETCHING_CONTACTS_SUCCESS = "FETCHING_CONTACTS_SUCCESS",
  FETCHING_CONTACTS_ERROR   = "FETCHING_CONTACTS_ERROR",
  FETCHING_ONE_CONTACT         = "FETCHING_ONE_CONTACT",
  FETCHING_ONE_CONTACT_SUCCESS = "FETCHING_ONE_CONTACT_SUCCESS",
  FETCHING_ONE_CONTACT_ERROR   = "FETCHING_ONE_CONTACT_ERROR",
  UPDATING_CONTACT          = "UPDATING_CONTACT",
  UPDATING_CONTACT_SUCCESS  = "UPDATING_CONTACT_SUCCESS",
  UPDATING_CONTACT_ERROR    = "UPDATING_CONTACT_ERROR",
  DELETING_CONTACT          = "DELETING_CONTACT",
  DELETING_CONTACT_SUCCESS  = "DELETING_CONTACT_SUCCESS",
  DELETING_CONTACT_ERROR    = "DELETING_CONTACT_ERROR";

export default {
  namespaced: true,
  state:      {
    isLoading: false,
    error:     null,
    contacts:   [],
    contact: null
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
    hasContacts(state) {
      return state.contacts['hydra:member'].length > 0;
    },
    contacts(state) {
      return state.contacts['hydra:member'];
    },
    contact(state) {
      return state.contact;
    }
  },
  mutations:  {
    [CREATING_CONTACT](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [CREATING_CONTACT_SUCCESS](state, contact) {
      state.isLoading = false;
      state.error     = null;
      state.contacts.push(contact);
    },
    [CREATING_CONTACT_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
    },
    [FETCHING_CONTACTS](state) {
      state.isLoading = true;
      state.error     = null;
      state.contacts   = [];
    },
    [FETCHING_CONTACTS_SUCCESS](state, contacts) {
      state.isLoading = false;
      state.error     = null;
      state.contacts   = contacts;
    },
    [FETCHING_CONTACTS_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.contacts   = [];
    },
    [FETCHING_ONE_CONTACT](state) {
      state.isLoading = true;
      state.error     = null;
      state.contacts   = [];
    },
    [FETCHING_ONE_CONTACT_SUCCESS](state, contact) {
      state.isLoading = false;
      state.error     = null;
      state.contact   = contact;
    },
    [FETCHING_ONE_CONTACT_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
      state.contacts   = [];
    },
    [UPDATING_CONTACT](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [UPDATING_CONTACT_SUCCESS](state, contact, index) {
      state.isLoading = false;
      state.error     = null;
      state.contacts[index] = contact;
    },
    [UPDATING_CONTACT_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
    },
    [DELETING_CONTACT](state) {
      state.isLoading = true;
      state.error     = null;
    },
    [DELETING_CONTACT_SUCCESS](state, index) {
      state.isLoading = false;
      state.error     = null;
      state.contacts.splice(index, 1);
    },
    [DELETING_CONTACT_ERROR](state, error) {
      state.isLoading = false;
      state.error     = error;
    },
  },
  actions:    {
    async create({commit}, contact) {
      commit(CREATING_CONTACT);
      try {
        let response = await ContactsAPI.create(contact);
        commit(CREATING_CONTACT_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(CREATING_CONTACT_ERROR, error);
        return null;
      }
    },
    async findAll({commit}) {
      commit(FETCHING_CONTACTS);
      try {
        let response = await ContactsAPI.findAll();

        for (let contact of response.data['hydra:member']) {
          let entreprise = await ContactsAPI.findEntreprise(contact.id);
          contact.entreprise = entreprise.data;
        }

        commit(FETCHING_CONTACTS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_CONTACTS_ERROR, error);
        return null;
      }
    },
    async findById({commit}, id) {
      commit(FETCHING_ONE_CONTACT);
      try {
        let response = await ContactsAPI.findOneById(id);
        let entreprise = await ContactsAPI.findEntreprise(id);
        response.data.entreprise = entreprise.data;

        commit(FETCHING_ONE_CONTACT_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_ONE_CONTACT_ERROR, error);
        return null;
      }
    },
    async update({commit}, data) {
      commit(UPDATING_CONTACT);
      try {
        let response = await ContactsAPI.update(data.contact);
        commit(UPDATING_CONTACT_SUCCESS, response.data, data.index);
        return response.data;
      } catch (error) {
        commit(UPDATING_CONTACT_ERROR, error);
      }
    },
    async delete({commit}, data) {
      commit(DELETING_CONTACT);
      try {
        let response = await ContactsAPI.delete(data.contact);
        commit(DELETING_CONTACT_SUCCESS, data.index);
        return response.data;
      } catch (error) {
        commit(DELETING_CONTACT_ERROR, error);
      }
    }
  }
};
