<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12 pr-0">
            <div class="d-lg-flex">
              <h3 class="text-light font-weight-bold mb-0 mr-5">
                List of all Contacts
              </h3>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">
                  {{ contacts.length }} Contacts enregistrés
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
                  v-else-if="!hasContacts"
                  class="row col"
                >
                  No contacts found!
                </div>
                <div
                  v-else
                  class="text-light font-weight-bold card-list"
                >
                  <div class="form-row card-list-header">
                    <div class="col-3">
                      <label for="name">Prénom</label>
                    </div>
                    <div class="col-3">
                      <label for="tjmRegion">Nom</label>
                    </div>
                    <div class="col-3">
                      <label for="tjmRegion">Entreprise</label>
                    </div>
                  </div>
                </div>
                <div
                  v-for="(cont, index) in getContacts"
                  :key="cont.id"
                  class="card-list-items"
                >
                  <contact-component
                    :contact="cont"
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
import ContactComponent from "../components/ContactsComponent";

export default {
  name:      "Contacts",
  components: {
    ContactComponent
  },
  data() {
    return {
      contacts: "",
      contact: {
        firstname: "",
        lastname: "",
        entreprise: ""
      }
    };
  },
  computed:  {
    isLoading() {
      return this.$store.getters["contact/isLoading"];
    },
    hasError() {
      return this.$store.getters["contact/hasError"];
    },
    error() {
      return this.$store.getters["contact/error"];
    },
    hasContacts() {
      return this.$store.getters["contact/hasContacts"];
    },
    getContacts() {
      return this.$store.getters["contact/contacts"];
    }
  },
  beforeMount() {
    this.hydrate();
  },
  methods:   {
    async createContact() {
      await this.$store.dispatch("contact/create", this.$data.contact)
        .then(() => {
          this.$data.contact = {
            firstname: "",
            lastname: "",
            entreprise: ""
          };
        }
        )
        .catch(error => {
          console.log(error);
        });
    },
    async hydrate() {
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
