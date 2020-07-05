<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12 pr-0">
            <div class="d-lg-flex">
              <h1 class="text-light font-weight-bold mb-0 mr-5">
                Fiche entreprise : {{ entreprise.name }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <EntrepriseComponent
        :entreprise="entreprise"
      />
      <DatesComponent :entreprise="entreprise" />
    </div>

    <div class="row mt-3">
      <ContactsComponent
        :entreprise="entreprise"
      />
      <MissionsComponent
        :entreprise="entreprise"
      />
    </div>
  </div>
</template>

<script>
import EntrepriseComponent from "../components/entreprise/EntrepriseComponent";
import DatesComponent from "../components/entreprise/DatesComponent";
import ContactsComponent from "../components/entreprise/ContactsComponent";
import MissionsComponent from "../components/entreprise/MissionsComponent";

export default {
  name:      "EntrepriseView",
  components: {MissionsComponent, ContactsComponent, EntrepriseComponent, DatesComponent},
  data() {
    return {
      entreprise: {
        id: "",
        name: "",
        type: "",
        siret: "",
        address: {},
        dates: [],
        contacts : [],
        missions: []
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
        this.$data.entreprises = this.$store.getters["entreprise/entreprises"];
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
