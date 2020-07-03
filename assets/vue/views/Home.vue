<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12 pr-0">
            <div class="d-lg-flex">
              <h3 class="text-light font-weight-bold mb-0 mr-5">
                Welcome to Dashboard
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12 col-sm-6 col-md-6 col-xl-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Missions
            </h4>
            <div class="form-row card-list-header font-weight-bold">
              <div class="col-5">
                <label for="item-list-missions-title">Titre</label>
              </div>
              <div class="col-3">
                <label for="item-list-missions-start">Début</label>
              </div>
              <div class="col-3">
                <label for="item-list-missions-end">Fin</label>
              </div>
              <div class="col-1">
                <label for="item-list-missions-tjm">TJM</label>
              </div>
            </div>
            <p class="text-small">
              {{ missions['hydra:member'].length }} Missions renseignées
            </p>
            <div
              v-for="(mission, index) in getMissions"
              :key="mission.id"
              class=""
            >
              <dash-missions-component
                :mission="mission"
                :index="index"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-6 col-xl-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Annuaire
            </h4>
            <p class="text-small">
              {{ contacts['hydra:member'].length }} Contacts actifs
            </p>
            <div class="form-row card-list-header font-weight-bold">
              <div class="col-4">
                <label for="item-list-contact-firstname">Prénom</label>
              </div>
              <div class="col-4">
                <label for="item-list-contact-lastname">Nom</label>
              </div>
              <div class="col-4">
                <label for="item-list-contact-role">Rôle</label>
              </div>
            </div>
            <div
              v-for="contact in getContacts"
              :key="contact.id"
              class=""
            >
              <dash-contacts-component
                :contact="contact"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-6 col-xl-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Entreprises
            </h4>
            <p class="text-small">
              {{ entreprises['hydra:member'].length }} Entreprises référencées
            </p>
            <div class="form-row card-list-header font-weight-bold">
              <div class="col-3">
                <label for="item-list-entreprise-name">Nom</label>
              </div>
              <div class="col-3">
                <label for="item-list-entreprise-type">Type</label>
              </div>
              <div class="col-3">
                <label for="item-list-entreprise-siret">Siret</label>
              </div>
              <div class="col-3">
                <label for="item-list-entreprise-city">Ville</label>
              </div>
            </div>
            <div
              v-for="(entreprise, index) in getEntreprises"
              :key="entreprise.id"
              class=""
            >
              <dash-entreprises-component
                :entreprise="entreprise"
                :index="index"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashContactsComponent from "../components/dashboard/DashContactsComponent";
import DashMissionsComponent from "../components/dashboard/DashMissionsComponent";
import DashEntreprisesComponent from "../components/dashboard/DashEntreprisesComponent";

export default {
  name: "Home",
  components: {
    DashContactsComponent,
    DashMissionsComponent,
    DashEntreprisesComponent
  },
  props: {
    user:{
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      missions: {
        '@id': "",
        '@context': "",
        '@type': "",
        'hydra:member': [],
        'hydra:totalItems': ""
      },
      contacts: {
        '@id': "",
        '@context': "",
        '@type': "",
        'hydra:member': [],
        'hydra:totalItems': ""
      },
      entreprises: {
        '@id': "",
        '@context': "",
        '@type': "",
        'hydra:member': [],
        'hydra:totalItems': ""
      },
    };
  },
  computed:{
    getMissions() {
      return this.$store.getters["mission/missions"];
    },
    getContacts() {
      return this.$store.getters["contact/contacts"]
    },
    getEntreprises() {
      return this.$store.getters["entreprise/entreprises"]
    }
  },
  beforeMount() {
    this.hydrateMissions();
    this.hydrateContacts();
    this.hydrateEntreprises();
  },
  methods:   {
    async hydrateMissions() {
      await this.$store.dispatch("mission/findAll")
        .then(data => {
          this.$data.missions = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async hydrateContacts() {
      await this.$store.dispatch("contact/findAllActive")
        .then(data => {
          this.$data.contacts = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async hydrateEntreprises() {
      await this.$store.dispatch("entreprise/findAll")
        .then(data => {
          this.$data.entreprises = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
