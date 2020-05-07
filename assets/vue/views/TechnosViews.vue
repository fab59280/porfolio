<template>
  <div>
    <div class="row col">
      <h1>Technologies</h1>
    </div>

    <div class="row col list-group">
      <form>
        <div class="form-row">
          <div class="col-3">
            <input
              v-model="techno.name"
              type="text"
              class="form-control"
              name="name"
            >
          </div>
          <div class="col-3">
            <input
              v-model="techno.tjmRegion"
              type="text"
              class="form-control"
              name="tjmRegion"
            >
          </div>
          <div class="col-3">
            <input
              v-model="techno.tjmFrance"
              type="text"
              class="form-control"
              name="tjmFrance"
            >
          </div>
          <div class="col-3">
            <button
              type="button"
              class="btn btn-dark form-control"
              @click="createTechno()"
            >
              Create
            </button>
          </div>
        </div>
      </form>
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
      <li class="list-group-item list-group-item-warning">
        <div class="form-row">
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
      </li>
      <li
        v-for="(tech, index) in getTechnos"
        :key="tech.id"
        :class="{'list-group-item list-group-item-info': index % 2 === 0, 'list-group-item list-group-item-primary': index % 2
          !==
          0 }"
      >
        <techno-component
          :techno="tech"
          :index="index"
        />
      </li>
    </ul>
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
