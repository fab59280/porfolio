import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Tech from "../views/TechnosViews";
import Entreprises from "../views/EntreprisesViews";
import Entreprise from "../views/EntrepriseViews";
import Contacts from "../views/ContactsViews";
import Login from "../views/LoginViews";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/login", component: Login, props: true, meta: { requiresAuth: false } },
    { path: "/", component: Home, meta: { requiresAuth: true } },
    { path: "/technos", component: Tech, meta: { requiresAuth: true }  },
    { path: "/entreprises", component: Entreprises, meta: { requiresAuth: true }  },
    { path: "/contacts", component: Contacts, meta: { requiresAuth: true }  },
    { path: "/entreprise-:id", component: Entreprise, meta: { requiresAuth: true }  },
    //{ path: "/:path((^admin|api))", redirect: "/" }
  ],
  isAuthenticated: false
});
