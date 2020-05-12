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
