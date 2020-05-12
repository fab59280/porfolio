<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="text-light font-weight-bold col-3">
      <span
        v-show="editOffset !== index"
        class="link"
        @click="$router.push('/contact-' + contact.id)"
      >{{ contact.firstname }}</span>
      <input
        v-show="editOffset===index"
        :id="'item-contact-firstname-' + index"
        v-model="contact.firstname"
        type="text"
        class="card-inputx"
        @keydown.enter="updateContact"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="text-light font-weight-bold col-3">
      <span
        v-show="editOffset !== index"
        class="link"
        @click="$router.push('/contact-' + contact.id)"
      >{{ contact.lastname }}</span>
      <input
        v-show="editOffset===index"
        :id="'item-contact-lastname-' + index"
        v-model="contact.lastname"
        type="text"
        class="card-inputx"
        @keydown.enter="updateContact"
        @keydown.esc="cancelEditing"
      >
    </div>
    <div class="text-light font-weight-bold col-3">
      {{ contact.entreprise.name }}
    </div>
    <div class="col-3">
      <a
        href="#"
        class="card-link card-link-primary"
        :title="'Edit ' + contact.firstname + contact.lastname"
        @click.prevent="startEditing(contact, index)"
      >
        <i class="fa fa-edit" />
      </a>
      <a
        href="#"
        class="card-link card-link-danger"
        :title="'Delete ' + contact.firstname + contact.lastname "
        @click.prevent="deleteEditing(contact, index)"
      >
        <i class="fa fa-times" />
      </a>
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
    }
  }
}
</script>
