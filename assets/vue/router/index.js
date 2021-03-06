import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home";
import Tech from "../views/TechnosViews";
import Entreprises from "../views/EntreprisesViews";
import Entreprise from "../views/EntrepriseViews";
import Contacts from "../views/ContactsViews";
import Contact from "../views/ContactViews";
import Login from "../views/LoginViews";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/login", component: Login, props: true, meta: { requiresAuth: false } },
    { path: "/", component: Home, meta: { requiresAuth: true } },
    { path: "/technos", component: Tech, meta: { requiresAuth: true }  },
    { path: "/entreprises", component: Entreprises, meta: { requiresAuth: true }  },
    { path: "/contacts", component: Contacts, meta: { requiresAuth: true }  },
    { path: "/entreprise-:id", component: Entreprise, meta: { requiresAuth: true }  },
    { path: "/contact-:id", component: Contact, meta: { requiresAuth: true }  },
    //{ path: "/:path((^admin|api))", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters["login/isAuthenticated"]) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
