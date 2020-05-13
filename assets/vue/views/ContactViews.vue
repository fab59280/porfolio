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
      <contact-component :contact="contact" />
      <entreprise-component :contact="contact" />
      <mails-component :contact="contact" />
      <telephones-component :contact="contact" />
    </div>
  </div>
</template>

<script>
import contactComponent from "../components/contact/ContactComponent";
import entrepriseComponent from "../components/contact/EntrepriseComponent";
import mailsComponent from "../components/contact/MailsComponent";
import telephonesComponent from "../components/contact/TelephonesComponent";

export default {
  name:     "ContactView",
  components:{
    contactComponent,
    entrepriseComponent,
    mailsComponent,
    telephonesComponent
  },
  data() {
    return {
      contact: {
        id: "",
        firstname:  "",
        lastname:   "",
        role: "",
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
    async saveContact() {
      await this.$store.dispatch('contact/update', this.contact);
    }
  }
};
</script>
