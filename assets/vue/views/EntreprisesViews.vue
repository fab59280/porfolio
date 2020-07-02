<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-12 pr-0">
            <div class="d-lg-flex">
              <h3 class="text-light font-weight-bold mb-0 mr-5">
                List of all Technologies
              </h3>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title stretch-title">
                  <div class="stretch-title-item">
                    {{ entreprises['hydra:member'].length }} Entreprises enregistrées
                  </div>
                  <div
                    class="stretch-title-item link stretch-title-item-add"
                    @click="display"
                  >
                    +
                  </div>
                </h4>
                <div class="form-row card-list-header text-light font-weight-bold ">
                  <div class="col-3">
                    <label for="name">Name</label>
                  </div>
                  <div class="col-2">
                    <label for="siret">Type</label>
                  </div>
                  <div class="col-3">
                    <label for="siret">Ville</label>
                  </div>
                  <div class="col-2">
                    <label for="siret">Siret</label>
                  </div>
                  <div class="col-2">
                    <label for="siret">Actions</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <input
                      v-show="add===true"
                      :id="'item-add-entreprise-name'"
                      v-model="entreprise.name"
                      type="text"
                      class="card-input"
                      @keydown.enter="addEntreprise"
                      @keydown.esc="cancelAdding"
                    >
                  </div>
                  <div class="col-2">
                    <input
                      v-show="add===true"
                      :id="'item-add-entreprise-type'"
                      v-model="entreprise.type"
                      type="text"
                      class="card-input"
                      @keydown.enter="addEntreprise"
                      @keydown.esc="cancelAdding"
                    >
                  </div>
                  <div
                    v-show="add === true"
                    class="col-3"
                  />
                  <div class="col-2">
                    <input
                      v-show="add === true"
                      :id="'item-add-entreprise-siret'"
                      v-model="entreprise.siret"
                      type="text"
                      class="card-input"
                      @keydown.enter="addEntreprise"
                      @keydown.esc="cancelAdding"
                    >
                  </div>
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
                  v-else-if="!hasEntreprises"
                  class="row col"
                >
                  No entreprises found!
                </div>
                <div
                  v-else
                  class="text-light font-weight-bold card-list"
                >
                  <div
                    v-for="(ent, index) in getEntreprises"
                    :key="ent.id"
                    class="card-list-items"
                  >
                    <entreprise-component
                      :entreprise="ent"
                      :index="index"
                      :add="add"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntrepriseComponent from "../components/EntrepriseComponent";

export default {
  name:      "Entreprises",
  components: {
    EntrepriseComponent
  },
  data() {
    return {
      entreprises: {
        '@id': "",
        '@context': "",
        '@type': "",
        'hydra:member': [],
        'hydra:totalItems': ""
      },
      entreprise: {
        name: "",
        siret: "",
        type: "",
      },
      add: false
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
  methods:   {
    async addEntreprise() {
      console.log(this.$data.entreprise);
      await this.$store.dispatch("entreprise/create", this.$data.entreprise)
        .then(() => {
          this.$data.entreprise = {
            name:      "",
            siret: "",
            type: ""
          };
          this.$data.add = false;
        }
        )
        .catch(error => {
          console.log(error);
        });
    },
    async hydrate() {
      await this.$store.dispatch("entreprise/findAll")
        .then(data => {
          this.$data.entreprises = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    display() {
      this.$data.add = true;
      this.$nextTick(function () {
        document.getElementById('item-add-entreprise-name').focus()
      }.bind(this));
    },
    cancelAdding() {
      this.$data.add = false;
      this.$data.entreprise = {
        name:      "",
        siret: "",
        type: "",
        address: ""
      };
    },
  }
};
</script>
