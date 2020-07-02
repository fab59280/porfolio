<template>
  <div class="col-12 col-sm-12 col-md-12 col-xl-8 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Meetings
          </div>
          <div
            class="stretch-title-item link stretch-title-item-add"
            @click="display"
          >
            +
          </div>
        </h4>
        <div class="form-row card-list-header text-light font-weight-bold">
          <div class="col-5">
            <label for="item-add-dates-date">Date</label>
          </div>
          <div class="col-5">
            <label for="item-add-dates-type">Type</label>
          </div>
          <div class="col-2">
            <label for="item-add-dates-detail">Actions</label>
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <div class="card-input-title justify-content-between">
            Date
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <input
            v-show="add===true"
            :id="'item-date-add-date'"
            v-model="rdv.date"
            type="text"
            class="card-input justify-content-between"
            @keydown.enter="addDate"
            @keydown.esc="cancelAdding"
          >
        </div>

        <div
          v-show="add === true"
          class="stretch-title"
        >
          <div class="card-input-title justify-content-between">
            Type
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <input
            v-show="add===true"
            :id="'item-date-add-type'"
            v-model="rdv.type"
            type="text"
            class="card-input justify-content-between"
            @keydown.enter="addDate"
            @keydown.esc="cancelAdding"
          >
        </div>

        <div
          v-show="add === true"
          class="stretch-title"
        >
          <div class="card-input-title justify-content-between">
            Notes
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <textarea
            v-show="add===true"
            :id="'item-date-add-date'"
            v-model="rdv.notes"
            type="textarea"
            rows="10"
            class="card-input justify-content-between"
            @keydown.enter="addDate"
            @keydown.esc="cancelAdding"
          />
        </div>
        <div
          v-if="contact.dates.length > 0"
          class="text-light font-weight-bold"
        >
          <div
            v-for="(d, index) in contact.dates"
            :key="d.id"
            class="justify-content-between row row-list"
          >
            <div
              v-show="editOffset !== index || edit === false"
              class="col-5"
            >
              {{ d.date }}
            </div>
            <input
              v-show="editOffset === index && edit === true"
              :id="'item-date-date-' + index"
              v-model="d.date"
              type="text"
              class="card-input"
              @keydown.enter="saveContact"
              @keydown.esc="cancelEditing"
            >
            <div
              v-show="editOffset !== index || edit === false"
              class="col-5"
            >
              {{ d.type }}
            </div>
            <input
              v-show="editOffset === index && edit === true"
              :id="'item-date-type-' + index"
              v-model="d.type"
              type="text"
              class="card-input"
              @keydown.enter="saveContact"
              @keydown.esc="cancelEditing"
            >
            <div class="col-2">
              <a
                v-show="show === false"
                href="#"
                class="card-link card-link-primary"
                :title="'See Notes'"
                @click.prevent="showNotes(index)"
              >
                <i
                  class="fa fa-eye"
                />
              </a>
              <a
                v-show="show === true"
                href="#"
                class="card-link card-link-primary"
                :title="'See Notes'"
                @click.prevent="hideNotes(index)"
              >
                <i
                  class="fa fa-eye-slash"
                />
              </a>
              <a
                href="#"
                class="card-link card-link-primary"
                :title="'Edit ' + d.date"
                @click.prevent="startEditing(d, index)"
              >
                <i class="fa fa-edit" />
              </a>
              <a
                href="#"
                class="card-link card-link-danger"
                :title="'Delete ' + d.date "
                @click.prevent="deleteEditing(d, index)"
              >
                <i class="fa fa-times" />
              </a>
            </div>
            <div
              v-show="(show === true || edit === true) && editOffset === index"
              class="textarea-zone"
            >
              <textarea
                :id="'item-date-notes-' + index"
                v-model="d.notes"
                type="textarea"
                class="card-input"
                :disabled="show === true"
                rows="10"
                @keydown.enter.ctrl="saveContact"
                @keydown.esc="cancelEditing"
              />
            </div>
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
  name: "DatesComponent",
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
      rdv: {
        date:"",
        type:"",
        notes:""
      },
      add: false,
      show: false,
      edit: false,
      editOffset:  -1,
      editPost : {},
      editPostOri: {},
    }
  },
  methods: {
    addDate() {
      this.saveContact(true);
    },
    display() {
      const now = new Date();
      const date = now.toISOString().replace('T', ' ').split('.')[0];
      this.$data.rdv.date = date;

      this.$data.add = true;
      this.$data.show = false;
      this.$data.edit = false;
      this.$nextTick(function () {
        document.getElementById('item-date-add-date').focus()
      }.bind(this));
    },
    showNotes(index) {
      this.$data.show = true;
      this.$data.editOffset  = index

    },
    hideNotes() {
      this.$data.show = false;
      this.$data.editOffset  = -1
    },
    startEditing(date, index) {
      this.$data.edit = true;
      this.$data.show = false;
      this.$data.add = false;
      this.$data.editOffset  = index
      this.$data.editPost    = date
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        document.getElementById('item-date-date-' + this.$data.editOffset).focus()
      }.bind(this));
    },
    cancelAdding() {
      this.$data.add = false;
      this.$data.rdv = {
        date:"",
        type:"",
        notes:""
      };
    },
    cancelEditing() {
      this.$data.edit = false;
      this.$data.editOffset = -1
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    deleteEditing(mail, index) {
      if (confirm("Are you sure you want to delete this entry ? ")) {
        this.contact.dates.splice(index, 1);
        this.saveContact();
      }
    },
    async saveContact(add = false) {
      let url = add === true ? 'date/create' : 'date/update';
      let data = add === true ? this.$data.rdv : this.$data.editPost;

      await this.$store.dispatch(url, data)
        .then((dates) => {
          this.contact.dates.push(dates);
          this.contact.entreprise.dates.push(dates);

          this.$store.dispatch('contact/update', this.contact)
            .then((contact) => {

              this.contact.entreprise.contacts.forEach(el => {
                if(el.id === contact.id) {
                  el.dates = contact.dates;
                }
              })
              this.contact.entreprise.dates.push(dates);
              this.$store.dispatch('entreprise/update', this.contact.entreprise)
                .catch(error => {
                  console.log(error);
                })
            })
            .catch(error => {
              console.log(error);
            })
        })
        .then(() => {
          this.add = false;
          this.edit = false;
          this.show = false;
          this.$data.editOffset = -1
          this.$data.editPostOri = {}
          this.$data.editPost = {}
          this.$data.rdv = {
            date:"",
            type:"",
            notes:""
          };
        });
    }
  }
}
</script>

<style scoped>

</style>
