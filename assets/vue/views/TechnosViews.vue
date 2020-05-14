<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-sm-9">
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
                    {{ technos['hydra:member'].length }} Technos enregistrées
                  </div>
                  <div
                    class="stretch-title-item link stretch-title-item-add"
                    @click="display"
                  >
                    +
                  </div>
                </h4>
                <div class="form-row card-list-header">
                  <div class="col-3">
                    <label for="name">Name</label>
                  </div>
                  <div class="col-3">
                    <label for="tjmRegion">Tjm Region</label>
                  </div>
                  <div class="col-3">
                    <label for="tjmRegion">Tjm France</label>
                  </div>
                </div>
                <div class="col-3">
                  <input
                    v-show="add===true"
                    :id="'item-add-techno-name'"
                    v-model="techno.name"
                    type="text"
                    class="card-input"
                    @keydown.enter="addTechno"
                    @keydown.esc="cancelAdding"
                  >
                </div>
                <div class="col-3">
                  <input
                    v-show="add === true"
                    :id="'item-add-techno-tjmRegion'"
                    v-model="techno.tjmRegion"
                    type="text"
                    class="card-input"
                    @keydown.enter="addTechno"
                    @keydown.esc="cancelAdding"
                  >
                </div>
                <div class="col-3">
                  <input
                    v-show="add===true"
                    :id="'item-add-techno-tjmFrance'"
                    v-model="techno.tjmFrance"
                    type="text"
                    class="card-input"
                    @keydown.enter="addTechno"
                    @keydown.esc="cancelAdding"
                  >
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
                <div
                  v-else
                  class="text-light font-weight-bold card-list"
                >
                  <div
                    v-for="(tech, index) in getTechnos"
                    :key="tech.id"
                    class="card-list-items"
                  >
                    <techno-component
                      :techno="tech"
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
import TechnoComponent from "../components/TechnoComponent";

export default {
  name:      "Technos",
  components: {
    TechnoComponent
  },
  data() {
    return {
      technos: {
        '@id': "",
        '@context': "",
        '@type': "",
        'hydra:member': [],
        'hydra:totalItems': ""
      },
      techno: {
        name: "",
        tjmRegion: "",
        tjmFrance: ""
      },
      add: false
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
  beforeMount() {
    this.hydrate();
  },
  methods:   {
    async addTechno() {
      await this.$store.dispatch("tech/create", this.$data.techno)
        .then(() => {
          this.$data.techno = {
            name:      "",
            tjmRegion: "",
            tjmFrance: ""
          };
          this.$data.add = false;
        }
        )
        .catch(error => {
          console.log(error);
        });
    },
    async hydrate() {
      await this.$store.dispatch("tech/findAll")
        .then(data => {
          this.$data.technos = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    display() {
      this.$data.add = true;
      this.$nextTick(function () {
        document.getElementById('item-add-techno-name').focus()
      }.bind(this));
    },
    cancelAdding() {
      this.$data.add = false;
      this.$data.techno = {
        name:      "",
        tjmRegion: "",
        tjmFrance: ""
      };
    },
  }
};
</script>
