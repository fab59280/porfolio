<template>
  <div>
    <h1>Connexion</h1>
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
</template>

<script>

export default {
  name:         'Login',
  data() {
    return {
      username:     "",
      password:     "",
      isError:      false,
      errorMessage: "",
      user: ""
    }
  },
  computed:  {
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
  methods: {
    async login() {
      console.log('send login');

      await this.$store.dispatch("login/login",
        {
          username: this.$data.username,
          password: this.$data.password
        })
        .then(data => {
          this.username = '';
          this.password = '';

          if(data.error !== undefined) {
            this.$data.isError = true;
            this.$data.errorMessage = data.error;
            return false;
          }
          this.$store.dispatch('login/getUser', data.location)
            .then(user => {
              this.$parent.user = user;
              console.log(this.$store.getters['login/user']);
            })
          this.$router.push(this.$route.query.redirect || '/')
        })
        .catch(error => {
          console.log(error);
          this.$data.isError = true;
          this.$data.errorMessage = error;

        })
    }
  }
}
</script>
