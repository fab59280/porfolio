<template>
  <div>
    <div class="row col">
      <h1>Entreprise {{ getEntreprise.name }}</h1>
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
      v-else-if="!hasEntreprise"
      class="row col"
    >
      No entreprises found!
    </div>
    <ul
      v-else
      class="list-group row col"
    >
      <li class="list-group-item list-group-item-info">
        <div
          class="row col"
        >
          <div class="col-12 col-lg-3">
            {{ getEntreprise.name }}
          </div>

          <div
            v-if="getEntreprise.type !== ''"
            class="col-12 col-lg-3"
          >
            {{ getEntreprise.type }}
          </div>
          <div
            v-else
            class="col-12 col-lg-3"
          >
            -
          </div>
          <div
            v-if="getEntreprise.siret !== ''"
            class="col-12 col-lg-3"
          >
            {{ getEntreprise.siret }}
          </div>
          <div
            v-else
            class="col-12 col-lg-3"
          >
            -
          </div>
          <div class="row">
            <div
              v-if="getEntreprise.contacts.length > 0"
              class="col-12 col-lg-3"
            >
              <ul
                v-for="contact in getEntreprise.contacts"
                :key="contact.id"
              >
                <li>
                  {{ contact.firstname }} {{ contact.lastname }}
                </li>
              </ul>
            </div>
            <div
              v-else
              class="col-12 col-lg-3"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name:      "EntrepriseView",
  data() {
    return {
      entreprise: {
        name: "",
        type: "",
        siret: "",
        address: "",
        dates: "",
        contacts : [],
        missions: ""
      }
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
    hasEntreprise() {
      return this.$store.getters["entreprise/hasEntreprise"];
    },
    getEntreprise() {
      return this.$store.getters["entreprise/entreprise"];
    },
    getContacts() {
      return  this.$store.getters["entreprise/contacts"];
    }
  },
  beforeMount() {
    this.fetchEntreprise();
  },
  methods:   {
    async createEntreprise() {
      const result = await this.$store.dispatch("entreprise/create", this.$data.entreprises);
      if (result !== null) {
        this.$data.entreprises = this.  $store.getters["entreprise/entreprises"];
      }
    },
    async fetchEntreprise() {
      await this.$store.dispatch("entreprise/findById", this.$route.params.id)
        .then(data => {
          this.$data.entreprise = data;
        })
    },
    async getAllContacts() {
      this.$data.entreprise.contacts.forEach((url, index) => {
        this.$store.dispatch("entreprise/findContacts", url)
          .then(data => {
            this.$data.entreprise.contacts[index] = data;
          })
      });
    },
    async getAddress() {
      this.$store.dispatch("entreprise/findAddress", this.$data.entreprise.address[0])
        .then(data => {
          this.$data.entreprise.address = data;
        })
    }
  }
};
</script>
