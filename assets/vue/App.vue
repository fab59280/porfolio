<template>
  <div class="container-scroller">
    <nav
      class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
    >
      <div class="navbar-brand-wrapper d-flex align-items-center justify-content-between">
        <router-link
          class="navbar-brand"
          to="/"
        >
          <span>Portfolio</span>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item nav-profile dropdown show">
            <a
              id="profileDropdown-navbar"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-expanded="true"
            >
              <span
                v-if="user"
              >
                {{ user.username }}
              </span>
              <span v-else>
                <router-link
                  class="navbar-brand"
                  to="/login"
                  title="Se connecter"
                >
                  Se connecter </router-link>
              </span>
            </a>
            <div
              v-if="user"
              class="dropdown-menu dropdown-menu-right navbar-dropdown flat-dropdown"
              aria-labelledby="profileDropdown-navbar"
            >
              <div class="flat-dropdown-header">
                <div class="d-flex">
                  <div>
                    <span class="profile-name font-weight-bold">{{ user.username }} | {{ user.roles[0] }}</span>
                  </div>
                </div>
              </div>
              <div
                v-if="user"
                class="profile-dropdown-body"
              >
                <ul class="list-profile-items">
                  <li class="profile-item">
                    <a
                      href="/logout"
                      class="profile-dropdown-link"
                    >
                      <div class="d-flex align-items-center">
                        <div>
                          <h5 class="item-title item-title--link mt-0">Logout</h5>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid page-body-wrapper">
      <div
        v-if="user"
        class="sidebar sidebar-offcanvas"
      >
        <ul class="nav">
          <li class="nav-item">
            <div class="sidebar-menu-title">
              <span>Components</span>
            </div>
            <ul class="nav submenu-wrapper">
              <router-link
                class="nav-item"
                tag="li"
                to="/technos"
                active-class="active"
              >
                <a class="nav-link">
                  <span class="menu-title">Technologies</span>
                </a>
              </router-link>
              <router-link
                class="nav-item"
                tag="li"
                to="/entreprises"
                active-class="active"
              >
                <a class="nav-link">
                  <span class="menu-title">Entreprises</span>
                </a>
              </router-link>
              <router-link
                class="nav-item"
                tag="li"
                to="/contacts"
                active-class="active"
              >
                <a class="nav-link">
                  <span class="menu-title">Annuaire</span>
                </a>
              </router-link>
            </ul>
          </li>
        </ul>
      </div>
      <div :class="{'main-panel' : user, 'main-panel main-panel--login' : !user }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:    "App",
  computed: {
    isAuthenticated() {
      return this.$store.getters["login/isAuthenticated"]
    },
    user() {
      return this.$store.getters["login/user"];
    }
  },
  created() {
    let isAuthenticated = JSON.parse(this.$parent.$el.attributes["data-is-authenticated"].value),
      user = JSON.parse(this.$parent.$el.attributes["data-user"].value);

    let payload = { isAuthenticated: isAuthenticated, user: user };
    this.$store.dispatch("login/onRefresh", payload);

    axios.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        if (err.response.status === 401) {
          this.$router.push({path: "/login"})
        }
        throw err;
      });
    });
  },
}
</script>
