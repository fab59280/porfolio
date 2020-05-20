<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12 pr-0">
            <div class="d-lg-flex">
              <h1 class="text-light font-weight-bold mb-0 mr-5">
                Please Login
              </h1>
              <form
                method="post"
                @submit.prevent="login"
              >
                <div v-if="hasError">
                  <div class="alert alert-danger">
                    {{ error }}
                  </div>
                </div>

                <label for="inputUsername">Username</label>
                <input
                  id="inputUsername"
                  v-model="username"
                  type="text"
                  name="username"
                  class="form-control"
                  required
                  autofocus
                >
                <label for="inputPassword">Password</label>
                <input
                  id="inputPassword"
                  v-model="password"
                  type="password"
                  name="password"
                  class="form-control"
                  required
                >

                <button
                  class="btn btn-lg btn-primary"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:     'Login',
  props: {
    user:{
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      username:     "",
      password:     "",
      isError:      false,
      errorMessage: ""
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters["login/isLoading"];
    },
    hasError() {
      return this.$store.getters["login/hasError"];
    },
    error() {
      return this.$store.getters["login/error"];
    },
    isAuthenticated() {
      return this.$store.getters['login/isAuthenticated'];
    },
    getUser() {
      return this.$store.getters["login/user"];
    }
  },
  created() {
    let redirect = this.$route.query.redirect;
    if (this.$store.getters["login/isAuthenticated"]) {
      if (typeof redirect !== "undefined") {
        this.$router.push({path: redirect});
      } else {
        this.$router.push({path: "/"});
      }
    }
  },
  methods:  {
    async login() {

      let payload = {
          username: this.$data.username,
          password: this.$data.password
        },
        redirect = this.$route.query.redirect;

      await this.$store.dispatch("login/login", payload);

      if (!this.$store.getters["login/hasError"]) {
        if (typeof redirect !== "undefined") {
          await this.$router.push({path: redirect});
        } else {
          await this.$router.push({path: "/"});
        }
      }

    }
  }
}
</script>
