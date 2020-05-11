<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="text-light font-weight-bold">
      {{ contact.firstname }}
    </div>
    <div class="text-light font-weight-bold">
      {{ contact.lastname }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactComponent",
  props: {
    contact: {
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
      await this.$store.dispatch("tech/update", {contact: this.$data.editPost, index: this.$data.editOffset })
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
    async deleteTechno(contact, index) {
      await this.$store.dispatch("tech/delete", {contact: contact, index: index })
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
        console.log('item-contact-name-' + this.$data.editOffset)
        document.getElementById('item-contact-name-' + this.$data.editOffset).focus()
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
        this.deleteTechno(contact, index);
      }
    }
  }
}
</script>
