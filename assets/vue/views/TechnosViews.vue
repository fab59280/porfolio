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
                <h4 class="card-title">
                  {{ technos.length }} Technos enregistrées
                </h4>

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
                </div>
                <div
                  v-for="(tech, index) in getTechnos"
                  :key="tech.id"
                  class="card-list-items"
                >
                  <techno-component
                    :techno="tech"
                    :index="index"
                  />
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
      technos: "",
      techno: {
        name: "",
        tjmRegion: "",
        tjmFrance: ""
      }
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
    async createTechno() {
      await this.$store.dispatch("tech/create", this.$data.techno)
        .then(() => {
          this.$data.techno = {
            name:      "",
            tjmRegion: "",
            tjmFrance: ""
          };
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
    }
  }
};
</script>
