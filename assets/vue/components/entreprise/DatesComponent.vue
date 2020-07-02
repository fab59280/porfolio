<template>
  <div class="col-12 col-sm-12 col-md-6 col-xl-8 grid-margin stretch-card">
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
          <div class="col-3">
            <label for="item-add-dates-date">Date</label>
          </div>
          <div class="col-3">
            <label for="item-add-dates-type">Type</label>
          </div>
          <div class="col-4">
            <label for="item-add-dates-contact">Contact</label>
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
            Contact
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <select
            id="item-contact-entreprise"
            v-model="econtact.index"
            class="card-input"
            @keydown.esc="cancelEditing"
          >
            <option
              v-for="(cont, i) in entreprise.contacts"
              :key="cont.id"
              :value="i"
            >
              {{ cont.firstname }} {{ cont.lastname }}
            </option>
          </select>
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
          v-if="entreprise.dates.length > 0"
          class="text-light font-weight-bold"
        >
          <div
            v-for="(d, index) in entreprise.dates"
            :key="d.id"
            class="justify-content-between row row-list"
          >
            <div
              class="col-3"
            >
              {{ d.date }}
            </div>
            <div
              class="col-3"
            >
              {{ d.type }}
            </div>
            <div class="col-4">
              <span
                v-for="contact in entreprise.contacts"
                :key="contact.id"
              >
                <span
                  v-for="date in contact.dates"
                  :key="date.id"
                >
                  <span
                    v-if="date.id === d.id"
                  >
                    {{ contact.firstname }} {{ contact.lastname }}
                  </span>
                </span>
              </span>
            </div>
            <div class="col-2">
              <a
                v-show="show === false || editOffset !== index"
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
                v-show="show === true && editOffset === index"
                href="#"
                class="card-link card-link-primary"
                :title="'See Notes'"
                @click.prevent="hideNotes(index)"
              >
                <i
                  class="fa fa-eye-slash"
                />
              </a>
            </div>
            <div
              v-show="show === true && editOffset === index"
              class="textarea-zone"
            >
              <textarea
                :id="'item-date-notes-' + index"
                v-model="d.notes"
                type="textarea"
                class="card-input"
                :disabled="show === true"
                rows="10"
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
    entreprise: {
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
      econtact: {
        index: ""
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
    display() {
      this.$data.add = true;
      this.$data.show = false;
      this.$data.edit = false;
      this.$nextTick(function () {
        document.getElementById('item-date-add-date').focus()
      }.bind(this));
    },
    addDate() {
      this.saveContact(true);
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
      this.$data.econtact = {
        index:""
      };
    },
    cancelEditing() {
      this.$data.edit = false;
      this.$data.editOffset = -1
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    async saveContact(add = false) {
      let url = add === true ? 'date/create' : 'dates/update';
      let data = add === true ? this.$data.rdv : this.$data.editPost;

      await this.$store.dispatch(url, data)
        .then((response) => {
          this.entreprise.dates.push(response);
          this.entreprise.contacts[this.$data.econtact.index].dates.push(response);

          this.$store.dispatch('entreprise/update', this.entreprise)
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
          this.$data.econtact = {
            index:""
          };
        });
    }
  }
}
</script>

<style scoped>

</style>
