import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Tech from "../views/TechnosViews";
import Entreprises from "../views/EntreprisesViews";
import Entreprise from "../views/EntrepriseViews";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/vue/home", component: Home },
    { path: "/vue/technos", component: Tech },
    { path: "/vue/entreprises", component: Entreprises },
    { path: "/vue/entreprise-:id", component: Entreprise },
    { path: "/vue/*", redirect: "/vue/home" }
  ]
});
