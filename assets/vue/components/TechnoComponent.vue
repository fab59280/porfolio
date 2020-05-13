<template>
  <div
    class="form-row"
  >
    <div class="col-3">
      <span v-show="editOffset !== index">
        {{ techno.name }}
      </span>
      <input
        v-show="editOffset===index"
        :id="'item-techno-name-' + index"
        v-model="techno.name"
        type="text"
        class="card-input"
        @keydown.enter="updateTechno"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="col-3">
      <span v-show="editOffset !== index">
        {{ techno.tjmRegion }} €
      </span>
      <input
        v-show="editOffset===index"
        :id="'item-techno-tjmRegion-' + index"
        v-model="techno.tjmRegion"
        type="text"
        class="card-input"
        @keydown.enter="updateTechno"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="col-3">
      <span v-show="editOffset !== index">
        {{ techno.tjmFrance }} €
      </span>
      <input
        v-show="editOffset===index"
        :id="'item-techno-tjmFrance-' + index"
        v-model="techno.tjmFrance"
        type="text"
        class="card-input"
        @keydown.enter="updateTechno"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="col-3">
      <a
        href="#"
        class="card-link card-link-primary"
        :title="'Edit ' + techno.name"
        @click.prevent="startEditing(techno, index)"
      >
        <i class="fa fa-edit" />
      </a>
      <a
        href="#"
        class="card-link card-link-danger"
        :title="'Delete ' + techno.name "
        @click.prevent="deleteEditing(techno, index)"
      >
        <i class="fa fa-times" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TechnoComponent",
  props: {
    techno: {
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
    async updateTechno() {
      await this.$store.dispatch("tech/update", {techno: this.$data.editPost, index: this.$data.editOffset })
        .then(data => {
          this.$data.technos = data;

          this.$data.editOffset = -1
          this.$data.editPostOri = {}
          this.$data.editPost = {}
        })
        .catch(error => {
          console.log(error);
        });
    },
    async deleteTechno(techno, index) {
      await this.$store.dispatch("tech/delete", {techno: techno, index: index })
        .catch(error => {
          console.log(error);
        });
    },
    startEditing(techno, index) {
      this.$data.editOffset  = index
      this.$data.editPost    = techno
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        console.log('item-techno-name-' + this.$data.editOffset)
        document.getElementById('item-techno-name-' + this.$data.editOffset).focus()
      }.bind(this))
    },
    cancelEditing() {
      this.$set(this.techno, this.editOffset, this.editPostOri)
      this.$data.editOffset = -1
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    deleteEditing(techno, index) {
      if (confirm("Are you sure you want to delete this entry ? " + techno.name)) {
        this.deleteTechno(techno, index);
      }
    }
  }
}
</script>
