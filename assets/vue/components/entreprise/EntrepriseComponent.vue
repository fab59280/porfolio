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
              class="card-link card-link-edit"
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
            {{ entreprise.name }} | {{ entreprise.type }} |
            <a
              v-if="entreprise.phone.telephone !== ''"
              :href="'tel:' + entreprise.phone.telephone"
              :title="'Téléphoner ' + entreprise.phone.telephone"
            > {{ entreprise.phone.telephone }}</a>
            <span
              v-else
              class="text-light font-weight-bold"
            >
              -
            </span>
          </p>
          <p v-if="entreprise.siret !== null">
            {{ entreprise.siret }}
          </p>
          <label
            v-show="edit===true"
            for="item-edit-entreprise-name"
          >Nom</label>
          <input
            v-show="edit===true"
            :id="'item-entreprise-name'"
            v-model="entreprise.name"
            type="text"
            class="card-input"
            @keydown.enter="updateInfos"
            @keydown.esc="cancelEditing"
          >
          <label
            v-show="edit===true"
            for="item-edit-entreprise-type"
          >Type</label>
          <input
            v-show="edit===true"
            :id="'item-entreprise-type'"
            v-model="entreprise.type"
            type="text"
            class="card-input"
            @keydown.enter="updateInfos"
            @keydown.esc="cancelEditing"
          >
          <label
            v-show="edit===true"
            for="item-edit-entreprise-siret"
          >Siret</label>
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
            <p>{{ entreprise.address.complement }}</p>
            <p>{{ entreprise.address.postcode }} {{ entreprise.address.city }}</p>
            <p>{{ entreprise.address.country }}</p>
          </div>
          <div
            class="col-2"
          >
            <p
              v-show="edit !== true"
              id="localization"
              class="card-link card-link-primary"
              :title="'Voir sur la carte ' + entreprise.name"
              @click="redirect"
            >
              <i
                class="fa fa-map-marker"
              />
            </p>
          </div>
          <div
            v-show="edit === false"
            class="text-light font-weight-bold"
          >
                &nbsp;
          </div>
          <div
            v-show="edit === true"
            class="text-light font-weight-bold col-12"
          >
            <label
              for="item-edit-entreprise-phone"
            >Téléphone</label>
            <input
              :id="'item-entreprise-phone'"
              v-model="entreprise.phone.telephone"
              type="text"
              class="card-input"
              @keydown.enter="updateInfos"
              @keydown.esc="cancelEditing"
            >
          </div>
          <div
            v-show="edit === true"
            class="text-light font-weight-bold"
          >
                &nbsp;
          </div>
          <div
            v-show="edit === true"
            class="text-light font-weight-bold"
          >
            <label
              v-show="edit===true"
              for="item-edit-entreprise-address-address"
            >Adresse</label>
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-address'"
              v-model="entreprise.address.address"
              type="text"
              class="card-input"
              @keydown.enter="updateInfos"
              @keydown.esc="cancelEditing"
            >
            <label
              v-show="edit===true"
              for="item-edit-entreprise-address-address"
            >Complement</label>
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-complement'"
              v-model="entreprise.address.complement"
              type="text"
              class="card-input"
              @keydown.enter="updateInfos"
              @keydown.esc="cancelEditing"
            >
            <label
              v-show="edit===true"
              for="item-edit-entreprise-address-postcode"
            >Code Postal</label>
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-postcode'"
              v-model="entreprise.address.postcode"
              type="text"
              class="card-input"
              @keydown.enter="updateInfos"
              @keydown.esc="cancelEditing"
            >
            <label
              v-show="edit===true"
              for="item-edit-entreprise-address-city"
            >Ville</label>
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-city'"
              v-model="entreprise.address.city"
              type="text"
              class="card-input"
              @keydown.enter="updateInfos"
              @keydown.esc="cancelEditing"
            >
            <label
              v-show="edit===true"
              for="item-edit-entreprise-address-country"
            >Pays (FR)</label>
            <input
              v-show="edit===true"
              :id="'item-entreprise-address-country'"
              v-model="entreprise.address.country"
              type="text"
              class="card-input"
              @keydown.enter="updateInfos"
              @keydown.esc="cancelEditing"
            >
          </div>
        </div>
        <div class="row border-top">
          <div class="text-light font-weight-bold col-12">
            <p
              v-show="edit !== true"
            >
              {{ entreprise.description }}
            </p>

            <label
              v-show="edit===true"
              for="item-edit-entreprise-description"
            >Description</label>
            <div class="textarea-zone">
              <textarea
                v-show="edit===true"
                :id="'item-entreprise-description'"
                v-model="entreprise.description"
                type="textarea"
                rows="10"
                class="card-input"
                @keydown.ctrl.enter="updateInfos"
                @keydown.esc="cancelEditing"
              />
            </div>
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
    redirect() {
      console.log(this.entreprise.address.address);
      const url = 'https://www.google.fr/maps/place/' + this.entreprise.address.address.replace(/\s/g, '+').replace(/[,]/g, ' ') + ',' +
            this.entreprise.address.postcode +
            ',' +
            this.entreprise.address.city
      console.log(url);
      window.open(url);
    },
    updateInfos() {
      this.saveEntreprise();
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
  }
}
</script>
