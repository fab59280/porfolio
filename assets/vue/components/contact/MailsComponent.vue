<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Mails
          </div>
          <div
            class="stretch-title-item link stretch-title-item-add"
            @click="display"
          >
            +
          </div>
        </h4>
        <div
          v-if="contact.mails.length > 0"
          class="text-light font-weight-bold"
        >
          <div
            v-show="add === true"
            class="stretch-title"
          >
            <div
              class="card-input-title justify-content-between"
            >
              Email
            </div>
          </div>
          <div
            v-show="add === true"
            class="stretch-title"
          >
            <input
              v-show="add===true"
              :id="'item-email-add-email'"
              v-model="email.email"
              type="text"
              class="card-input justify-content-between"
              @keydown.enter="addEmail"
              @keydown.esc="cancelAdding"
            >
          </div>
          <div
            v-for="(mail, index) in contact.mails"
            :key="mail.id"
            class="justify-content-between"
          >
            <span
              v-show="editOffset !== index"
              class="col-5"
            >
              <a
                :href="'tel:' + mail.email"
                :title="'mailto ' + mail.email"
              > {{ mail.email }}</a>
            </span>
            <input
              v-show="editOffset===index"
              :id="'item-mail-email-' + index"
              v-model="mail.email"
              type="text"
              class="card-input"
              @keydown.enter="saveContact"
              @keydown.esc="cancelEditing"
            >
            <span class="col-2">
              <a
                href="#"
                class="card-link card-link-primary"
                :title="'Edit ' + mail.email"
                @click.prevent="startEditing(mail, index)"
              >
                <i class="fa fa-edit" />
              </a>
              <a
                href="#"
                class="card-link card-link-danger"
                :title="'Delete ' + mail.email "
                @click.prevent="deleteEditing(mail, index)"
              >
                <i class="fa fa-times" />
              </a>
            </span>
          </div>
        </div>
        <div
          v-else
          class="text-light font-weight-bold"
        >
          -
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailsComponent",
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
      email: {
        email:""
      },
      add: false,
      editOffset:  -1,
      editPost : {},
      editPostOri: {},
    }
  },
  methods: {
    addEmail() {
      this.contact.mails.push({
        email: this.email.email
      });

      this.saveContact();
    },
    display() {
      this.$data.add = true;
      this.$nextTick(function () {
        document.getElementById('item-email-add-email').focus()
      }.bind(this))
    },
    startEditing(mail, index) {
      this.$data.editOffset  = index
      this.$data.editPost    = mail
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        document.getElementById('item-mail-email-' + this.$data.editOffset).focus()
      }.bind(this))
    },
    cancelAdding() {
      this.$data.add = false;
      this.$data.mail = {
        email:""
      };
    },
    cancelEditing() {
      this.$data.editOffset = -1
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    deleteEditing(mail, index) {
      if (confirm("Are you sure you want to delete this entry ? " + mail.email)) {
        this.contact.mails.splice(index, 1);
        this.saveContact();
      }
    },
    async saveContact() {
      await this.$store.dispatch('contact/update', this.contact)
        .then(() => {
          this.add = false;
          this.$data.editOffset = -1
          this.$data.editPostOri = {}
          this.$data.editPost = {}
          this.$data.mail = {
            email:""
          };
        });
    }
  }
}
</script>

<style scoped>

</style>
