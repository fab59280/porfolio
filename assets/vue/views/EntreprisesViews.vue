<template>
  <div>
    <div class="row col">
      <h1>Entreprises</h1>
    </div>
    <!--
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
              <label for="tjmRegion">Type</label>
            </div>
            <div class="col-12 col-lg-3">
              <label for="tjmFrance">N° Siret</label>
            </div>
          </div>
          <div class="form-row">
            <div class="col-12 col-lg-3">
              <input
                v-model="entreprises.name"
                type="text"
                class="form-control"
                name="name"
              >
            </div>
            <div class="col-12 col-lg-3">
              <input
                v-model="entreprises.type"
                type="text"
                class="form-control"
                name="tjmRegion"
              >
            </div>
            <div class="col-12 col-lg-3">
              <input
                v-model="entreprises.siret"
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
    </div>-->

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
      v-else-if="!hasEntreprises"
      class="row col"
    >
      No entreprises found!
    </div>

    <ul
      v-else
      class="list-group row col"
    >
      <li>
        <div class="form-row">
          <div class="col-4">
            <label for="name">Name</label>
          </div>
          <div class="col-4">
            <label for="tjmRegion">Type</label>
          </div>
          <div class="col-4">
            <label for="tjmRegion">Localité</label>
          </div>
          <div class="col-4">
            <label for="tjmFrance">Siret</label>
          </div>
          <div class="col-4">
            <label for="actions">Actions</label>
          </div>
        </div>
      </li>
      <li
        v-for="(entreprise, index) in entreprises"
        :key="entreprise.id"
        :class="{'list-group-item list-group-item-info': index % 2 === 0, 'list-group-item list-group-item-primary': index % 2
          !==
          0 }"
      >
        <!--<div class="row col">
          <div class="col-12 col-lg-3">
            {{ entreprise.name }}
          </div>
          <div
            v-if="entreprise.type !== ''"
            class="col-12 col-lg-3"
          >
            {{ entreprise.type }}
          </div>
          <div
            v-else
            class="col-12 col-lg-3"
          >
            -
          </div>
          <div
            v-if="entreprise.siret !== ''"
            class="col-12 col-lg-3"
          >
            {{ entreprise.siret }}
          </div>
          <div
            v-else
            class="col-12 col-lg-3"
          >
            -
          </div>
          <div class="col-12 col-lg-3">
            <a
              :href="'/vue/entreprise-' + entreprise.id"
              :title="'Voir l\'entreprise' + entreprise.name"
            >Détails </a>
          </div>
        </div>-->
        <entreprises-component :entreprise="entreprise" />
      </li>
    </ul>
  </div>
</template>

<script>
import EntreprisesComponent from "../components/EntreprisesComponent";

export default {
  name:      "EntreprisesView",
  components: {
    EntreprisesComponent
  },
  data() {
    return {
      entreprises: []
    };
  },
  computed:  {
    isLoading() {
      return this.$store.getters["entreprise/isLoading"];
    },
    hasError() {
      return this.$store.getters["entreprise/hasError"];
    },
    error() {
      return this.$store.getters["entreprise/error"];
    },
    hasEntreprises() {
      return this.$store.getters["entreprise/hasEntreprises"];
    },
    getEntreprises() {
      return this.$store.getters["entreprise/entreprises"];
    }
  },
  beforeMount() {
    this.hydrate();
  },
  created() {
    this.hydrate();
  },
  methods:   {
    async createPost() {
      const result = await this.$store.dispatch("entreprise/create", this.$data.entreprises);
      if (result !== null) {
        this.$data.entreprises = this.$store.getters["entreprise/entreprises"];
      }
    },
    async getOne(id) {
      const result = await this.$store.dispatch("entreprise/findById", id)
      if (result !== null) {
        this.$data.entreprises = this.$store.getters["entreprise/entreprises"];
      }
    },
    async hydrate() {
      await this.$store.dispatch("entreprise/findAll")
        .then(data => {
          this.$data.entreprises = data;
        })
    }
  }
};
</script>
