<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Entreprise
          </div>
          <div
            class="stretch-title-item link stretch-title-item-edit"
          >
            <a
              href="#"
              class="card-link card-link-primary"
              :title="'Edit ' + contact.entreprise.name"
              @click.prevent="startEditing(contact)"
            >
              <i class="fa fa-edit" />
            </a>
          </div>
        </h4>
        <div
          v-show="edit === false"
          class="text-light font-weight-bold"
        >
          <p class="p-title">
            <a :href="'/entreprise-' + contact.entreprise.id">
              {{ contact.entreprise.name }} | {{ contact.entreprise.type }}
            </a>
          </p>
          <p v-if="contact.entreprise.siret !== null">
            {{ contact.entreprise.siret }}
          </p>
        </div>
        <div
          v-if="contact.entreprise.address !== undefined"
          v-show="edit === false"
          class="text-light font-weight-bold"
        >
          <p>{{ contact.entreprise.address.address }}</p>
          <p>{{ contact.entreprise.address.postcode }} {{ contact.entreprise.address.city }}</p>
        </div>
      </div>
      <div v-show="edit === true">
        <select
          id="item-contact-entreprise"
          v-model="contact.entreprise"
          class="card-input"
          @change="updateEntreprise"
          @keydown.esc="cancelEditing"
        >
          <option
            v-for="(entrep) in getEntreprises"
            :key="entrep.id"
            :value="entrep"
          >
            {{ entrep.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntrepriseComponent",
  props:{
    contact:{
      type: Object,
      default(){
        return {};
      }
    }
  },
  data() {
    return {
      entreprises: [],
      edit: false,
      editPost : {},
      editPostOri: {},
    }
  },
  computed: {
    getEntreprises() {
      return this.$store.getters["entreprise/entreprises"];
    }
  },
  beforeMount() {
    this.hydrate();
  },
  methods: {
    async hydrate() {
      await this.$store.dispatch("entreprise/findAll")
        .then(response => {
          const data = response['hydra:member'];
          this.$data.entreprises = data;
        });
    },
    startEditing(contact) {
      console.log(this.contact.entreprise.id)
      this.$data.edit = true;
      this.$data.editPost    = contact
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        document.getElementById('item-contact-entreprise').focus()
      }.bind(this))
    },
    updateEntreprise() {
      this.saveEntreprise();
    },
    cancelEditing() {
      this.$data.edit = false
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    async saveEntreprise() {
      let entreprise = {
        '@id': this.contact.entreprise['@id'],
        contacts: this.contact.entreprise.contacts
      };
      entreprise.contacts.push({
        '@id': this.contact['@id']
      });

      await this.$store.dispatch('entreprise/update', entreprise)
        .then(() => {
          this.edit = false;
          this.$data.editPostOri = {}
          this.$data.editPost = {}
        });
    },
  }
}
</script>

<style scoped>

</style>
