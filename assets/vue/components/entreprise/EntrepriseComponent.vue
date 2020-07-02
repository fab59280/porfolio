<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Informations Entreprise
          </div>
          <div
            class="stretch-title-item link stretch-title-item-edit"
          >
            <a
              href="#"
              class="card-link card-link-primary"
              :title="'Edit ' + entreprise.name"
              @click.prevent="startEditing(entreprise)"
            >
              <i class="fa fa-edit" />
            </a>
          </div>
        </h4>
        <div
          class="text-light font-weight-bold "
        >
          <p
            v-show="edit === false"
            class="p-title"
          >
            {{ entreprise.name }} | {{ entreprise.type }}
          </p>
          <p v-if="entreprise.siret !== null">
            {{ entreprise.siret }}
          </p>
          <input
            v-show="edit===true"
            :id="'item-entreprise-name'"
            v-model="entreprise.name"
            type="text"
            class="card-input"
            @keydown.enter="updateInfos"
            @keydown.esc="cancelEditing"
          >
          <input
            v-show="edit===true"
            :id="'item-entreprise-type'"
            v-model="entreprise.type"
            type="text"
            class="card-input"
            @keydown.enter="updateInfos"
            @keydown.esc="cancelEditing"
          >
          <input
            v-show="edit===true"
            :id="'item-entreprise-siret'"
            v-model="entreprise.siret"
            type="text"
            class="card-input"
            @keydown.enter="updateInfos"
            @keydown.esc="cancelEditing"
          >
        </div>
        <div class="text-light font-weight-bold ">
                    &nbsp;
        </div>
        <div class="row">
          <div
            v-if="entreprise.address !== undefined"
            v-show="edit === false"
            class="text-light font-weight-bold col-10"
          >
            <p>{{ entreprise.address.address }}</p>
            <p>{{ entreprise.address.postcode }} {{ entreprise.address.city }}</p>
            <p>{{ entreprise.address.country }}</p>
          </div>
          <div
            class="col-2"
          >
            <a
              :href="'https://www.google.fr/maps/place/' + entreprise.address.address.replace(/\s/g, '+').replace(/[,]/g, ' ') + ',' + entreprise.address.postcode +
                ',' +
                entreprise.address.city"
              target="_blank"
              class="card-link card-link-primary"
              :title="'Edit ' + entreprise.name"
            >
              <i
                class="fa fa-map-marker"
              />
            </a>
          </div>
          <div
            v-show="edit === true"
            class="text-light font-weight-bold"
          >
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-address'"
              v-model="entreprise.address.address"
              type="text"
              class="card-input"
              @keydown.enter="updateInfosAddresses"
              @keydown.esc="cancelEditing"
            >
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-postcode'"
              v-model="entreprise.address.postcode"
              type="text"
              class="card-input"
              @keydown.enter="updateInfosAddresses"
              @keydown.esc="cancelEditing"
            >
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-city'"
              v-model="entreprise.address.city"
              type="text"
              class="card-input"
              @keydown.enter="updateInfosAddresses"
              @keydown.esc="cancelEditing"
            >
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-country'"
              v-model="entreprise.address.country"
              type="text"
              class="card-input"
              @keydown.enter="updateInfosAddresses"
              @keydown.esc="cancelEditing"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:    "EntrepriseComponent",
  props:   {
    entreprise: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      edit:        false,
      editOffset:  -1,
      editPost:    {},
      editPostOri: {},
    }
  },
  methods: {
    updateInfos() {
      this.saveEntreprise();
    },
    updateInfosAddresses() {
      this.saveEntrepriseAddresse();
    },
    startEditing(entreprise) {
      this.$data.edit        = true
      this.$data.editPost    = entreprise
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        document.getElementById('item-entreprise-name').focus()
      }.bind(this))
    },
    cancelEditing() {
      this.$set(this.entreprise, this.edit, this.editPostOri)
      this.$data.edit        = false
      this.$data.editPostOri = {}
      this.$data.editPost    = {}
    },
    async saveEntreprise() {
      await this.$store.dispatch('entreprise/update', this.entreprise)
        .then(() => {
          this.edit              = false;
          this.$data.editPostOri = {}
          this.$data.editPost    = {}
        });
    },
    async saveEntrepriseAddresse() {
      await this.$store.dispatch('address/update', this.address)
        .then(() => {
          this.edit              = false;
          this.$data.editPostOri = {}
          this.$data.editPost    = {}
        });
    }
  }
}
</script>
