<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Téléphones
          </div>
          <div
            class="stretch-title-item link stretch-title-item-add"
            @click="display"
          >
            +
          </div>
        </h4>
        <div
          v-if="contact.telephones.length > 0"
          class="text-light font-weight-bold"
        >
          <div
            v-show="add === true"
            class="stretch-title"
          >
            <div
              class="card-input-title justify-content-between"
            >
              Numéro
            </div>
            <div
              class="card-input-title justify-content-between"
            >
              Type
            </div>
          </div>
          <div
            v-show="add === true"
            class="stretch-title"
          >
            <input
              v-show="add===true"
              :id="'item-telephone-add-telephone'"
              v-model="telephone.telephone"
              type="text"
              class="card-input justify-content-between"
              @keydown.enter="addTelephone"
              @keydown.esc="cancelAdding"
            >
            <input
              v-show="add===true"
              :id="'item-telephone-add-type'"
              v-model="telephone.type"
              type="text"
              class="card-input justify-content-between"
              @keydown.enter="addTelephone"
              @keydown.esc="cancelAdding"
            >
          </div>
          <div
            v-for="(phone, index) in contact.telephones"
            :key="phone.id"
            class="justify-content-between"
          >
            <span
              v-show="editOffset !== index"
              class="col-5"
            >
              <a
                :href="'tel:' + phone.telephone"
                :title="'Téléphoner ' + phone.telephone"
              > {{ phone.telephone }}</a>
            </span>
            <input
              v-show="editOffset===index"
              :id="'item-phone-telephone-' + index"
              v-model="phone.telephone"
              type="text"
              class="card-input"
              @keydown.enter="saveContact"
              @keydown.esc="cancelEditing"
            >
            <span
              v-show="editOffset !== index"
              class="col-5"
            > {{ phone.type }}</span>
            <input
              v-show="editOffset===index"
              :id="'item-phone-type-' + index"
              v-model="phone.type"
              type="text"
              class="card-input"
              @keydown.enter="saveContact"
              @keydown.esc="cancelEditing"
            >
            <span class="col-2">
              <a
                href="#"
                class="card-link card-link-primary"
                :title="'Edit ' + phone.telephone"
                @click.prevent="startEditing(phone, index)"
              >
                <i class="fa fa-edit" />
              </a>
              <a
                href="#"
                class="card-link card-link-danger"
                :title="'Delete ' + phone.telephone "
                @click.prevent="deleteEditing(phone, index)"
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
  name: "TelephonesComponent",
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
      telephone: {
        telephone:"",
        type:""
      },
      add: false,
      editOffset:  -1,
      editPost : {},
      editPostOri: {},
    }
  },
  methods: {
    addTelephone() {
      this.contact.telephones.push({
        telephone: this.telephone.telephone,
        type: this.telephone.type
      });

      this.saveContact();
    },
    display() {
      this.$data.add = true;
      this.$nextTick(function () {
        document.getElementById('item-telephone-add-telephone').focus()
      }.bind(this))
    },
    startEditing(phone, index) {
      this.$data.editOffset  = index
      this.$data.editPost    = phone
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        document.getElementById('item-phone-telephone-' + this.$data.editOffset).focus()
      }.bind(this))
    },
    cancelAdding() {
      //this.$set(this.add, this.telephone)
      this.$data.add = false;
      this.$data.telephone = {
        telephone:"",
        type:""
      };
    },
    cancelEditing() {
      this.$data.editOffset = -1
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    deleteEditing(phone, index) {
      if (confirm("Are you sure you want to delete this entry ? " + phone.telephone + " " + phone.type)) {
        this.contact.telephones.splice(index, 1);
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
          this.$data.telephone = {
            telephone:"",
            type:""
          };
        });
    }
  }
}
</script>

<style scoped>

</style>
