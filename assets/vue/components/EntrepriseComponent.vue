<template>
  <div
    class="form-row"
  >
    <div class="col-3">
      <span
        v-show="editOffset !== index"
        class="link"
        @click="$router.push('/entreprise-' + entreprise.id)"
      >
        {{ entreprise.name }}
      </span>
      <input
        v-show="editOffset===index"
        :id="'item-entreprise-name-' + index"
        v-model="entreprise.name"
        type="text"
        class="card-input"
        @keydown.enter="updateEntreprise"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="col-2">
      <span
        v-show="editOffset !== index"
        class="link"
        @click="$router.push('/entreprise-' + entreprise.id)"
      >
        {{ entreprise.type }}
      </span>
      <input
        v-show="editOffset===index"
        :id="'item-entreprise-type-' + index"
        v-model="entreprise.type"
        type="text"
        class="card-input"
        @keydown.enter="updateEntreprise"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="col-3">
      <span
        v-show="editOffset !== index"
        v-if="entreprise.address !== undefined"
      >
        {{ entreprise.address.city }}
      </span>
      <input
        v-if="entreprise.address !== undefined"
        v-show="editOffset===index"
        :id="'item-entreprise-city-' + index"
        v-model="entreprise.address.city"
        type="text"
        class="card-input"
        @keydown.enter="updateEntreprise"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="col-2">
      <span
        v-show="editOffset !== index"
        class="link"
        @click="$router.push('/entreprise-' + entreprise.id)"
      >
        {{ entreprise.siret }}
      </span>
      <input
        v-show="editOffset===index"
        :id="'item-entreprise-siret-' + index"
        v-model="entreprise.siret"
        type="text"
        class="card-input"
        @keydown.enter="updateEntreprise"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="col-2">
      <a
        href="#"
        class="card-link card-link-primary"
        :title="'Edit ' + entreprise.name"
        @click.prevent="startEditing(entreprise, index)"
      >
        <i class="fa fa-edit" />
      </a>
      <a
        href="#"
        class="card-link card-link-danger"
        :title="'Delete ' + entreprise.name "
        @click.prevent="deleteEditing(entreprise, index)"
      >
        <i class="fa fa-times" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntrepriseComponent",
  props: {
    entreprise: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      editOffset:  -1,
      editPost : {},
      editPostOri: {},
    }
  },
  computed: {
  },
  methods: {
    async updateEntreprise() {
      await this.$store.dispatch("entreprise/update", this.entreprise)
        .then(() => {

          this.$data.editOffset = -1
          this.$data.editPostOri = {}
          this.$data.editPost = {}
        })
        .catch(error => {
          console.log(error);
        });
    },
    async deleteEntreprise(entreprise) {
      await this.$store.dispatch("entreprise/delete", entreprise)
        .catch(error => {
          console.log(error);
        });
    },
    startEditing(entreprise, index) {
      this.$data.editOffset  = index
      this.$data.editPost    = entreprise
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        console.log('item-entreprise-name-' + this.$data.editOffset)
        document.getElementById('item-entreprise-name-' + this.$data.editOffset).focus()
      }.bind(this))
    },
    cancelEditing() {
      this.$set(this.entreprise, this.editOffset, this.editPostOri)
      this.$data.editOffset = -1
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    deleteEditing(entreprise, index) {
      if (confirm("Are you sure you want to delete this entry ? " + entreprise.name)) {
        this.deleteEntreprise(entreprise, index);
      }
    }
  }
}
</script>
