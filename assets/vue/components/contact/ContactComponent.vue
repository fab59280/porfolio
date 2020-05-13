<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Informations Personnelles
          </div>
          <div
            class="stretch-title-item link stretch-title-item-edit"
          >
            <a
              href="#"
              class="card-link card-link-primary"
              :title="'Edit ' + contact.firstname + ' ' + contact.lastname"
              @click.prevent="startEditing(contact)"
            >
              <i class="fa fa-edit" />
            </a>
          </div>
        </h4>
        <div
          class="text-light font-weight-bold "
          @click="updateInfos"
        >
          <span v-show="edit === false">{{ contact.firstname }}</span>
          <input
            v-show="edit===true"
            :id="'item-contact-firstname'"
            v-model="contact.firstname"
            type="text"
            class="card-input"
            @keydown.enter="updateInfos"
            @keydown.esc="cancelEditing"
          >
          <span v-show="edit === false">{{ contact.lastname }}</span>
          <input
            v-show="edit===true"
            :id="'item-contact-lastname'"
            v-model="contact.lastname"
            type="text"
            class="card-input"
            @keydown.enter="updateInfos"
            @keydown.esc="cancelEditing"
          >
        </div>
        <div class="text-light font-weight-bold ">
&nbsp;
        </div>
        <div class="text-light font-weight-bold ">
          <span v-show="edit === false">{{ contact.role }}</span>
          <input
            v-show="edit===true"
            :id="'item-'"
            v-model="contact.role"
            type="text"
            class="card-input"
            @keydown.enter="updateInfos"
            @keydown.esc="cancelEditing"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactComponent",
  props: {
    contact:{
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      edit: false,
      editOffset:  -1,
      editPost : {},
      editPostOri: {},
    }
  },
  methods: {
    updateInfos() {
      this.saveContact();
    },
    startEditing(contact) {
      this.$data.edit  = true
      this.$data.editPost    = contact
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        document.getElementById('item-contact-firstname').focus()
      }.bind(this))
    },
    cancelEditing() {
      this.$set(this.contact, this.edi, this.editPostOri)
      this.$data.edit = false
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    async saveContact() {
      await this.$store.dispatch('contact/update', this.contact)
        .then(() => {
          this.edit = false;
          this.$data.editPostOri = {}
          this.$data.editPost = {}
        });
    }
  }
}
</script>
