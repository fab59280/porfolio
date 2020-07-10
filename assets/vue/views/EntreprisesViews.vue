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
                <div class="form-row card-list-header font-weight-bold ">
                  <div class="col-2">
                    <label
                      class="card-link"
                      for="name"
                      @click="sort('name')"
                    >Name</label><i
                      v-if="currentSort === 'name' && currentSortDir === 'desc'"
                      class="fa fa-angle-down"
                    />
                    <i
                      v-if="currentSort === 'name' && currentSortDir === 'asc'"
                      class="fa fa-angle-up"
                    />
                  </div>
                  <div class="col-2">
                    <label
                      class="card-link"
                      for="type"
                      @click="sort('type')"
                    >Type</label><i
                      v-if="currentSort === 'type' && currentSortDir === 'desc'"
                      class="fa fa-angle-down"
                    />
                    <i
                      v-if="currentSort === 'type' && currentSortDir === 'asc'"
                      class="fa fa-angle-up"
                    />
                  </div>
                  <div class="col-2">
                    <label
                      class="card-link"
                      for="postcode"
                      @click="sort('address.postcode')"
                    >Code Postal</label><i
                      v-if="currentSort === 'address.postcode' && currentSortDir === 'desc'"
                      class="fa fa-angle-down"
                    />
                    <i
                      v-if="currentSort === 'address.postcode' && currentSortDir === 'asc'"
                      class="fa fa-angle-up"
                    />
                  </div>
                  <div class="col-2">
                    <label
                      class="card-link"
                      for="city"
                      @click="sort('address.city')"
                    >Ville</label><i
                      v-if="currentSort === 'address.city' && currentSortDir === 'desc'"
                      class="fa fa-angle-down"
                    />
                    <i
                      v-if="currentSort === 'address.city' && currentSortDir === 'asc'"
                      class="fa fa-angle-up"
                    />
                  </div>
                  <div class="col-2">
                    <label
                      class="card-link"
                      for="siret"
                      @click="sort('siret')"
                    >Siret</label><i
                      v-if="currentSort === 'siret' && currentSortDir === 'desc'"
                      class="fa fa-angle-down"
                    />
                    <i
                      v-if="currentSort === 'siret' && currentSortDir === 'asc'"
                      class="fa fa-angle-up"
                    />
                  </div>
                  <div class="col-2">
                    <label for="siret">Actions</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
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
                    class="col-2"
                  />
                  <div
                    v-show="add === true"
                    class="col-2"
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
                    v-for="(ent, index) in entreprises['hydra:member']"
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
      add: false,
      currentSort:'id',
      currentSortDir:'asc'
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
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir=== 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;

      return this.$data.entreprises['hydra:member'].sort((a,b) => {
        let sort = s.split('.');

        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(sort.length > 1) {
          if (a[s.split('.')[0]][s.split('.')[1]] < b[s.split('.')[0]][s.split('.')[1]]) return -1 * modifier;
          if (a[s.split('.')[0]][s.split('.')[1]] > b[s.split('.')[0]][s.split('.')[1]]) return 1 * modifier;
        } else {
          if (a[s.split('.')[0]] < b[s.split('.')[0]]) return -1 * modifier;
          if (a[s.split('.')[0]] > b[s.split('.')[0]]) return 1 * modifier;
        }
        return 0;
      });
    }
  }
};
</script>
