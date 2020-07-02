<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            {{ entreprise.contacts.length }} Contacts enregistrés
          </div>
          <div
            class="stretch-title-item link stretch-title-item-add"
            @click="display"
          >
            +
          </div>
        </h4>
        <div class="form-row card-list-header text-light font-weight-bold">
          <div class="col-3">
            <label for="item-add-contact-firstname">Prénom</label>
          </div>
          <div class="col-3">
            <label for="item-add-contact-lastname">Nom</label>
          </div>
          <div class="col-3">
            <label for="item-add-contact-entreprise">Rôle</label>
          </div>
        </div>
        <div class="row">
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
              :id="'item-add-contact-lastname'"
              v-model="contact.role"
              required="required"
              type="text"
              class="card-input"
              @keydown.enter="createContact"
              @keydown.esc="cancelAdding"
            >
          </div>
          <div class="col-3">
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
          v-if="!hasContacts"
          class="row col"
        >
          No contacts found!
        </div>
        <div
          v-else
          class="text-light font-weight-bold card-list"
        >
          <div
            v-for="econtact in entreprise.contacts"
            :key="econtact.id"
            class="justify-content-between row row-list"
          >
            <div class="text-light font-weight-bold col-3">
              <span
                class="link link--special"
                @click="$router.push('/contact-' + econtact.id)"
              >
                {{ econtact.firstname }}
              </span>
            </div>
            <div class="text-light font-weight-bold col-3">
              <span
                class="link link--special"
                @click="$router.push('/contact-' + econtact.id)"
              >{{ econtact.lastname }}</span>
            </div>
            <div class="text-light font-weight-bold col-6">
              <span
                class="link link--special"
                @click="$router.push('/contact-' + econtact.id)"
              >{{ econtact.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:     "ContactComponent",
  props:    {
    entreprise: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      add:     false,
      contact: {
        firstname: "",
        lastname:  "",
        role:      ""
      },
    };
  },
  computed: {
    hasContacts() {
      return this.entreprise.contacts.length
    }
  },
  methods:  {
    async createContact() {
      this.$data.contact.isActive      = true;
      this.$data.contact.entreprise_id = this.entreprise.id;

      await this.$store.dispatch("contact/create", this.$data.contact)
        .then(response => {
          this.entreprise.contacts.push(
            response
          );

          this.$store.dispatch('entreprise/update', this.entreprise);

          this.$data.contact = {
            firstname: "",
            lastname:  "",
            role:      "",
          };
          this.$data.add = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    display() {
      this.$data.add = true;
      this.$nextTick(function () {
        document.getElementById('item-add-contact-firstname').focus()
      }.bind(this));
    },
    cancelAdding() {
      this.$data.add     = false;
      this.$data.contact = {
        firstname: "",
        lastname:  "",
        role:      ""
      };
    }
  }
};
</script>
