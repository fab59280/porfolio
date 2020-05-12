import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store"

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('route need authentication')
    if (window.user || store.getters['login/user']) {
      console.log('user is authenticated: ' + window.user || store.getters['login/user'])
      next()
    } else {
      console.log('page should be redirect')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

new Vue(
  {
    components: {App},
    template:   '<App />',
    router,
    store
  }
).$mount('#app');

import '../scss/app.scss';
