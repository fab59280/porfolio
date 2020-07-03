<template>
  <div class="col-12 col-sm-12 col-md-6 col-xl-8 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            {{ entreprise.missions.length }} Missions
          </div>
          <div
            class="stretch-title-item link stretch-title-item-add"
            @click="display"
          >
            +
          </div>
        </h4>
        <div class="form-row card-list-header font-weight-bold">
          <div class="col-4">
            <label for="item-add-dates-titre">Titre</label>
          </div>
          <div class="col-2">
            <label for="item-add-dates-debut">Début</label>
          </div>
          <div class="col-2">
            <label for="item-add-dates-fin">Fin</label>
          </div>
          <div class="col-2">
            <label for="item-add-dates-tjm">TJM</label>
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
            Titre
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <input
            v-show="add===true"
            :id="'item-mission-add-title'"
            v-model="emission.title"
            type="text"
            class="card-input justify-content-between"
            @keydown.enter="addMission"
            @keydown.esc="cancelAdding"
          >
        </div>

        <div
          v-show="add === true"
          class="stretch-title"
        >
          <div class="card-input-title justify-content-between">
            Début
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <input
            v-show="add===true"
            :id="'item-mission-add-start'"
            v-model="emission.start"
            type="text"
            class="card-input justify-content-between"
            @keydown.enter="addMission"
            @keydown.esc="cancelAdding"
          >
        </div>

        <div
          v-show="add === true"
          class="stretch-title"
        >
          <div class="card-input-title justify-content-between">
            Fin
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <input
            v-show="add===true"
            :id="'item-mission-add-end'"
            v-model="emission.end"
            type="text"
            class="card-input justify-content-between"
            @keydown.enter="addMission"
            @keydown.esc="cancelAdding"
          >
        </div>

        <div
          v-show="add === true"
          class="stretch-title"
        >
          <div class="card-input-title justify-content-between">
            TJM
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <input
            v-show="add===true"
            :id="'item-mission-add-tjm'"
            v-model="emission.tjm"
            type="text"
            class="card-input justify-content-between"
            @keydown.enter="addMission"
            @keydown.esc="cancelAdding"
          >
        </div>

        <div
          v-show="add === true"
          class="stretch-title"
        >
          <div class="card-input-title justify-content-between">
            Description
          </div>
        </div>
        <div
          v-show="add === true"
          class="stretch-title"
        >
          <textarea
            v-show="add===true"
            :id="'item-date-add-date'"
            v-model="emission.description"
            type="textarea"
            rows="10"
            class="card-input justify-content-between"
            @keydown.ctrl.enter="addMission"
            @keydown.esc="cancelAdding"
          />
        </div>
        <div
          v-if="entreprise.missions.length > 0"
          class="text-light font-weight-bold"
        >
          <div
            v-for="(mission, index) in entreprise.missions"
            :key="mission.id"
            class="justify-content-between row row-list"
          >
            <div
              class="col-4"
            >
              <span
                v-show="edit!==true || index !== editOffset"
              >
                {{ mission.title }}
              </span>
              <input
                v-show="edit===true && index === editOffset"
                :id="'item-mission-edit-title-' + index"
                v-model="mission.title"
                type="text"
                class="card-input justify-content-between"
                @keydown.enter="saveMission"
                @keydown.esc="cancelEditing"
              >
            </div>
            <div
              class="col-2"
            >
              <span
                v-show="edit!==true || index !== editOffset"
              >
                {{ mission.start }}
              </span>
              <input
                v-show="edit===true && index === editOffset"
                :id="'item-mission-edit-start-' + index"
                v-model="mission.start"
                type="text"
                class="card-input justify-content-between"
                @keydown.enter="saveMission"
                @keydown.esc="cancelEditing"
              >
            </div>

            <div
              class="col-2"
            >
              <span
                v-show="edit!==true || index !== editOffset"
              >
                {{ mission.end }}
              </span>
              <input
                v-show="edit===true && index === editOffset"
                :id="'item-mission-edit-end-' + index"
                v-model="mission.end"
                type="text"
                class="card-input justify-content-between"
                @keydown.enter="saveMission"
                @keydown.esc="cancelEditing"
              >
            </div>
            <div
              class="col-2"
            >
              <span
                v-show="edit!==true || index !== editOffset"
              >
                {{ mission.tjm }} €
              </span>
              <input
                v-show="edit===true && index === editOffset"
                :id="'item-mission-edit-tjm-' + index"
                v-model="mission.tjm"
                type="text"
                class="card-input justify-content-between"
                @keydown.enter="saveMission"
                @keydown.esc="cancelEditing"
              >
            </div>
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
                :title="'Hide Notes'"
                @click.prevent="hideNotes(index)"
              >
                <i
                  class="fa fa-eye-slash"
                />
              </a>
              <a
                href="#"
                class="card-link card-link-edit"
                :title="'See Notes'"
                @click.prevent="startEditing(mission, index)"
              >
                <i
                  class="fa fa-edit"
                />
              </a>
            </div>
            <div
              v-show="(show === true || edit === true) && editOffset === index"
              class="textarea-zone"
            >
              <textarea
                :id="'item-mission-edit-description' + index"
                v-model="mission.description"
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
  name: "MissionsComponent",
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
      emission : {
        title:"",
        start:"",
        end:"",
        tjm:"",
        nbJours:"",
        description:""
      },
      show: false,
      add: false,
      edit: false,
      editOffset : -1,
      editPost: {},
      editPostOri: {},

    }
  },
  methods: {
    display() {
      const now = new Date();
      const date = now.toISOString().replace('T', ' ').split('.')[0];
      this.$data.emission.start = this.$data.emission.end = date;

      this.$data.add = true;
      this.$data.show = false;
      this.$data.edit = false;
      this.$nextTick(function () {
        document.getElementById('item-mission-add-title').focus()
      }.bind(this));
    },
    addMission() {
      this.saveMission(true);
    },
    startEditing(mission, index) {
      this.$data.edit = true;
      this.$data.show = false;
      this.$data.add = false;
      this.$data.editOffset  = index
      this.$data.editPost    = mission
      this.$data.editPostOri = JSON.parse(JSON.stringify(this.$data.editPost))
      // set focus ke element input
      this.$nextTick(function () {
        document.getElementById('item-mission-edit-title-' + index).focus()
      }.bind(this));
    },
    cancelAdding() {
      this.$data.add = false;
      this.$data.emission = {
        title:"",
        start:"",
        end:"",
        tjm:"",
        nbJours:"",
        description:""
      };
    },
    cancelEditing() {
      this.$data.edit = false;
      this.$data.editOffset = -1
      this.$data.editPostOri = {}
      this.$data.editPost = {}
    },
    showNotes(index) {
      this.$data.show = true;
      this.$data.editOffset  = index

    },
    hideNotes() {
      this.$data.show = false;
      this.$data.editOffset  = -1
    },
    async saveMission(add = false) {
      console.log(this.$data.emission);
      console.log(add);

      let url = add === true ? 'mission/create' : 'mission/update';
      let data = add === true ? this.$data.emission : this.$data.editPost;

      await this.$store.dispatch(url, data)
        .then((response) => {
          console.log(response);
          this.entreprise.missions.push(response);

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
          this.$data.emission = {
            title:"",
            start:"",
            end:"",
            tjm:"",
            nbJours:"",
            description:""
          };
        }).catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>
