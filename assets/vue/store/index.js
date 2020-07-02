import Vue from "vue";
import vuex from "vuex";
import Addresses from "./AddressesStore";
import ContactsStore from "./ContactsStore";
import DatesStore from "./DatesStore";
import EntrepriseModule from "./EntreprisesStore";
import LoginStore from "./LoginStore";
import TechModule from "./TechnosStore";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    address: Addresses,
    contact: ContactsStore,
    date: DatesStore,
    entreprise: EntrepriseModule,
    login: LoginStore,
    tech: TechModule
  }
});
