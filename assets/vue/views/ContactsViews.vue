<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-12">
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
                <h4 class="card-title stretch-title">
                  <div class="stretch-title-item">
                    {{ contacts['hydra:member'].length }} Contacts enregistrés
                  </div>
                  <div
                    class="stretch-title-item link stretch-title-item-add"
                    @click="display"
                  >
                    +
                  </div>
                </h4>
                <div class="form-row card-list-header font-weight-bold">
                  <div class="col-3">
                    <label for="item-add-contact-firstname">Prénom</label>
                  </div>
                  <div class="col-3">
                    <label for="item-add-contact-lastname">Nom</label>
                  </div>
                  <div class="col-3">
                    <label for="item-add-contact-role">Role</label>
                  </div>
                  <div
                    v-show="add===true"
                    class="col-2"
                  >
                    <label for="item-add-contact-entreprise">Entreprise</label>
                  </div>
                  <div
                    v-show="add===true"
                    class="col-1"
                  >
                    <label for="item-add-contact-action">Action</label>
                  </div>
                </div>
                <div
                  v-show="add===true"
                  class="row row-list"
                >
                  <div class="col-3">
                    <input
                      v-show="add===true"
                      :id="'item-add-contact-firstname'"
                      v-model="contact.firstname"
                      required="required"
                      type="text"
                      class="card-input"
                      @keydown.enter="createContact"
                      @keydown.esc="cancelAdding"
                    >
                  </div>
                  <div class="col-3">
                    <input
                      v-show="add === true"
                      :id="'item-add-contact-lastname'"
                      v-model="contact.lastname"
                      required="required"
                      type="text"
                      class="card-input"
                      @keydown.enter="createContact"
                      @keydown.esc="cancelAdding"
                    >
                  </div>
                  <div class="col-3">
                    <input
                      v-show="add === true"
                      :id="'item-add-contact-role'"
                      v-model="contact.role"
                      required="required"
                      type="text"
                      class="card-input"
                      @keydown.enter="createContact"
                      @keydown.esc="cancelAdding"
                    >
                  </div>
                  <div class="col-2">
                    <select
                      v-show="add === true"
                      id="item-contact-entreprise"
                      v-model="contact.entreprise"
                      required="required"
                      class="card-input"
                    >
                      <option
                        v-for="(entrep) in entreprises['hydra:member']"
                        :key="entrep.id"
                        :value="entrep"
                      >
                        {{ entrep.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-1">
                    <a
                      v-show="add === true"
                      href="#"
                      class="card-link card-link-danger card-link-add"
                      :title="'Ajouter le contact'"
                      @click.prevent="createContact"
                    >
                      <i class="fa fa-check-circle" />
                    </a>
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
                  v-else-if="!hasContacts"
                  class="row col"
                >
                  No contacts found!
                </div>
                <div
                  v-else
                  class="text-light font-weight-bold card-list"
                >
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
      contacts: {
        '@id': "",
        '@context': "",
        '@type': "",
        'hydra:member': [],
        'hydra:totalItems': ""
      },
      contact: {
        firstname:  "",
        lastname:   "",
        entreprise: []
      },
      add: false,
      entreprise: "",
      entreprises: ""
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
    },
    getEntreprises() {
      return this.$store.getters["entreprise/entreprises"];
    }
  },
  beforeMount() {
    this.hydrate();
  },
  methods:   {
    async createContact() {
      await this.$store.dispatch("contact/create", this.$data.contact)
        .then(response => {
          let entreprise = {
            '@id': this.$data.contact.entreprise['@id'],
            contacts: this.$data.contact.entreprise.contacts
          };
          entreprise.contacts.push({
            '@id': response['@id']
          });

          this.$store.dispatch('entreprise/update', entreprise)
            .then(data => {
              console.log(data);
            });

          this.$data.contact = {
            firstname: "",
            lastname: "",
            entreprise: ""
          };

          this.hydrate();
        })
        .catch(error => {
          console.log(error);
        });
    },
    async hydrate() {
      let params =this.$route.fullPath.substr(this.$route.path.length);
      await this.$store.dispatch("contact/findAll", params)
        .then(data => {
          this.$data.contacts = data;
        })
        .catch(error => {
          console.log(error);
        });

      await this.$store.dispatch("entreprise/findAll")
        .then(data => {
          this.$data.entreprises = data;
        })
    },
    display() {
      this.$data.add = true;
      this.$nextTick(function () {
        document.getElementById('item-add-contact-firstname').focus()
      }.bind(this));
    },
    cancelAdding() {
      this.$data.add = false;
      this.$data.contact = {
        firstname: "",
        lastname: "",
        entreprise: ""
      };
    }
  }
};
</script>
