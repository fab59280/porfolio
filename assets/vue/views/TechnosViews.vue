<template>
  <div>
    <div class="row col">
      <h1>Technologies</h1>
    </div>

    <div class="row col list-group">
      <fieldset
        title="Add a new Technology"
        class="list-group-item list-group-item-warning"
      >
        <form>
          <div class="form-row">
            <div class="col-12 col-lg-3">
              <label for="name">Name</label>
            </div>
            <div class="col-12 col-lg-3">
              <label for="tjmRegion">Tjm Region</label>
            </div>
            <div class="col-12 col-lg-3">
              <label for="tjmFrance">Tjm France </label>
            </div>
          </div>
          <div class="form-row">
            <div class="col-12 col-lg-3">
              <input
                v-model="technos.name"
                type="text"
                class="form-control"
                name="name"
              >
            </div>
            <div class="col-12 col-lg-3">
              <input
                v-model="technos.tjmRegion"
                type="text"
                class="form-control"
                name="tjmRegion"
              >
            </div>
            <div class="col-12 col-lg-3">
              <input
                v-model="technos.tjmFrance"
                type="text"
                class="form-control"
                name="tjmFrance"
              >
            </div>
            <div class="col-12 col-lg-3">
              <button
                type="button"
                class="btn btn-primary form-control"
                @click="createPost()"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </fieldset>
    </div>

    <div
      v-if="isLoading"
      class="row col"
    >
      <p>Loading...</p>
    </div>

    <div
      v-else-if="hasError"
      class="row col"
    >
      <div
        class="alert alert-danger"
        role="alert"
      >
        {{ error }}
      </div>
    </div>

    <div
      v-else-if="!hasTechnos"
      class="row col"
    >
      No technologies found!
    </div>
    <ul
      v-else
      class="list-group row col"
    >
      <li
        v-for="(tech, index) in getTechnos"
        :key="tech.id"
        :class="{'list-group-item list-group-item-info': index % 2 === 0, 'list-group-item list-group-item-primary': index % 2
          !==
          0 }"
      >
        <div class="row col">
          <div class="col-12 col-lg-3">
            {{ tech.name }}
          </div>
          <div class="col-12 col-lg-3">
            {{ tech.tjmRegion }} €
          </div>
          <div class="col-12 col-lg-3">
            {{ tech.tjmFrance }} €
          </div>
        </div>

        <!--        {{ tech.name }} - {{ tech.tjmRegion }}€ | {{ tech.tjmFrance }}€-->
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name:      "Technos",
  data() {
    return {
      technos: ""
    };
  },
  computed:  {
    isLoading() {
      return this.$store.getters["tech/isLoading"];
    },
    hasError() {
      return this.$store.getters["tech/hasError"];
    },
    error() {
      return this.$store.getters["tech/error"];
    },
    hasTechnos() {
      return this.$store.getters["tech/hasTechnos"];
    },
    getTechnos() {
      return this.$store.getters["tech/technos"];
    }
  },
  created() {
    this.$store.dispatch("tech/findAll");
  },
  methods:   {
    async createPost() {
      const result = await this.$store.dispatch("tech/create", this.$data.technos);
      if (result !== null) {
        this.$data.technos = this.$store.getters["tech/technos"];
      }
    }
  }
};
</script>
