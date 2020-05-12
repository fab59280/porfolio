<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12 pr-0">
            <div class="d-lg-flex">
              <h1 class="text-light font-weight-bold mb-0 mr-5">
                Fiche contact de {{ contact.firstname }} {{ contact.lastname }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Informations Personnelles
            </h4>
            <div class="text-light font-weight-bold ">
              <span>{{ contact.firstname }}</span>
              <span>{{ contact.lastname }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Entreprise
            </h4>
            <div class="text-light font-weight-bold">
              <p>
                <a :href="'/entreprise' + contact.entreprise.id">
                  {{ contact.entreprise.name }} | {{ contact.entreprise.type }}
                </a>
              </p>
              <p v-if="contact.entreprise.siret !== null">
                {{ contact.entreprise.siret }}
              </p>
            </div>
            <div class="text-light font-weight-bold">
              <p>{{ contact.entreprise.address.address }}</p>
              <p>{{ contact.entreprise.address.postcode }} {{ contact.entreprise.address.city }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Emails
            </h4>
            <div
              v-if="contact.mails.length > 0"
              class="text-light font-weight-bold"
            >
              <p
                v-for="mail in contact.mails"
                :key="mail.id"
              >
                <a
                  :href="'mailto:' + mail.email"
                  :title="'Mailto ' + mail.email"
                > {{ mail.email }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Téléphones
            </h4>
            <div
              v-if="contact.telephones.length > 0"
              class="text-light font-weight-bold"
            >
              <div
                v-for="phone in contact.telephones"
                :key="phone.id"
                class="justify-content-between"
              >
                <span class="col-6">
                  <a
                    :href="'tel:' + phone.telephone"
                    :title="'Téléphoner ' + phone.telephone"
                  > {{ phone.telephone }}</a>
                </span>
                <span class="col-6"> {{ phone.type }}</span>
              </div>
            </div>
            <div
              v-else
              class="text-light font-weight-bold"
            >
              -
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:     "ContactView",
  data() {
    return {
      contact: {
        id: "",
        firstname:  "",
        lastname:   "",
        dates:      {},
        entreprise: {
          id: "",
          name: "",
          siret:"",
          type: "",
          address: {
            address: "",
            postcode: "",
            country: "",
            city: ""
          },
        },
        mails:      {
          id:"",
          email: ""
        },
        telephones: {
          id:"",
          telephone: "",
          type: ""
        }
      },
      editOffset:  -1,
      editPost : {},
      editPostOri: {},
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["contact/isLoading"];
    },
    hasError() {
      return this.$store.getters["contact/hasError"];
    },
    error() {
      return this.$store.getters["contact/error"];
    },
    hasContact() {
      return this.$store.getters["contact/hasContact"];
    },
    getContact() {
      return this.$store.getters["contact/contact"];
    },
    getContacts() {
      return this.$store.getters["contact/contacts"];
    }
  },
  beforeMount() {
    this.fetchContact();
  },
  methods:  {
    async fetchContact() {
      await this.$store.dispatch("contact/findById", this.$route.params.id)
        .then(data => {
          this.$data.contact = data;
        })
    },
    async updateContact() {
      await this.$store.dispatch("contact/update", {contact: this.$data.editPost, index: this.$data.editOffset })
        .then(data => {
          this.$data.contacts = data;

          this.$data.editOffset = -1
          this.$data.editPostOri = {}
          this.$data.editPost = {}
        })
        .catch(error => {
          console.log(error);
        });
    },
    async deleteContact(contact, index) {
      await this.$store.dispatch("contact/delete", {contact: contact, index: index })
        .catch(error => {
          console.log(error);
        });
    },
    startEditing(contact, index) {
      this.$data.editOffset  = index
      this.$data.editPost    = contact
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        console.log('item-contact-firstname-' + this.$data.editOffset)
        document.getElementById('item-contact-firstname-' + this.$data.editOffset).focus()
      }.bind(this))
    },
    cancelEditing() {
      this.$set(this.contact, this.editOffset, this.editPostOri)
      this.$data.editOffset = -1
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    deleteEditing(contact, index) {
      if (confirm("Are you sure you want to delete this entry ? " + contact.name)) {
        this.deleteContact(contact, index);
      }
    },
    async addPhone(phone) {
      console.log(phone);
    }
  }
};
</script>
