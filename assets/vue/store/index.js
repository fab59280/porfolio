import Vue from "vue";
import vuex from "vuex";
import TechModule from "./TechnosStore";
import EntrepriseModule from "./EntreprisesStore";
import ContactsStore from "./ContactsStore";
import LoginStore from "./LoginStore";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    tech: TechModule,
    entreprise: EntrepriseModule,
    contact: ContactsStore,
    login: LoginStore
  }
});
