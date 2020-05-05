import Vue from "vue";
import vuex from "vuex";
import TechModule from "./TechnosStore";
import EntrepriseModule from "./EntreprisesStore";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    tech: TechModule,
    entreprise: EntrepriseModule
  }
});
