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
              <ul class="dashboard-link-btn-wrap mt-lg-0 mt-sm-2">
                <li>
                  <a
                    href="#"
                    class="text-danger"
                  ><span><i class="mdi mdi-cube-outline" /></span>Activities</a>
                </li>
                <li>
                  <a href="#"><span><i class="mdi mdi-signal" /></span>Statistics</a>
                </li>
                <li>
                  <a href="#"><span><i class="mdi mdi-file-document-outline" /></span>Summary</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Technos
            </h4>
            <p class="text-small">
              {{ technos.length }} Technos enregistrées
            </p>
            <div
              v-for="(tech, index) in getTechnos"
              :key="tech.id"
              class=""
            >
              <dash-techno-component
                :techno="tech"
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
              {{ contacts.length }} Contacts enregistrés
            </p>
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
    </div>
  </div>
</template>

<script>
import DashTechnoComponent from "../components/dashboard/DashTechnoComponent";
import DashContactsComponent from "../components/dashboard/DashContactsComponent";

export default {
  name: "Home",
  components: {
    DashTechnoComponent,
    DashContactsComponent
  },
  data() {
    return {
      technos: "",
      contacts: "",
    };
  },
  computed:{
    getTechnos() {
      return this.$store.getters["tech/technos"];
    },
    getContacts() {
      return this.$store.getters["contact/contacts"]
    }
  },
  beforeMount() {
    this.hydrateTechnos();
    this.hydrateContacts();
  },
  methods:   {
    async hydrateTechnos() {
      await this.$store.dispatch("tech/findAll")
        .then(data => {
          this.$data.technos = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async hydrateContacts() {
      await this.$store.dispatch("contact/findAll")
        .then(data => {
          this.$data.contacts = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
