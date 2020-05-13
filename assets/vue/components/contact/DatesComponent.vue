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
        <div
          v-if="contact.dates.length > 0"
          class="text-light font-weight-bold"
        >
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
            v-for="(d, index) in contact.dates"
            :key="d.id"
            class="justify-content-between"
          >
            <span
              v-show="editOffset !== index || edit === false"
              class="col-5"
            >
              {{ d.date }}
            </span>
            <input
              v-show="editOffset === index && edit === true"
              :id="'item-date-date-' + index"
              v-model="d.date"
              type="text"
              class="card-input"
              @keydown.enter="saveContact"
              @keydown.esc="cancelEditing"
            >
            <span
              v-show="editOffset !== index || edit === false"
              class="col-5"
            >
              {{ d.type }}
            </span>
            <input
              v-show="editOffset === index && edit === true"
              :id="'item-date-type-' + index"
              v-model="d.type"
              type="text"
              class="card-input"
              @keydown.enter="saveContact"
              @keydown.esc="cancelEditing"
            >
            <span class="col-2">
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
            </span>
            <div v-show="(show === true || edit === true) && editOffset === index">
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
      this.contact.dates.push({
        date: this.rdv.date,
        type: this.rdv.type,
        notes: this.rdv.notes
      });

      this.saveContact();
    },
    display() {
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
    async saveContact() {
      await this.$store.dispatch('contact/update', this.contact)
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
