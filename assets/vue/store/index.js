import Vue from "vue";
import vuex from "vuex";
import Addresses from "./AddressesStore";
import ContactsStore from "./ContactsStore";
import DatesStore from "./DatesStore";
import EntrepriseStore from "./EntreprisesStore";
import LoginStore from "./LoginStore";
import TechStore from "./TechnosStore";
import MissionsStore from "./MissionsStore";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    address: Addresses,
    contact: ContactsStore,
    date: DatesStore,
    entreprise: EntrepriseStore,
    login: LoginStore,
    mission: MissionsStore,
    tech: TechStore
  }
});
