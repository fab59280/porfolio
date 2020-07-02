<template>
  <div class="col-12 col-sm-12 col-md-6 col-xl-8 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            {{ entreprise.missions.length }} Missions
          </div>
        </h4>
        <div
          v-if="entreprise.missions.length > 0"
          class="text-light font-weight-bold"
        >
          <div
            v-for="mission in entreprise.missions"
            :key="mission.id"
            class="justify-content-between"
          >
            <span
              class="col-5"
            >
              {{ mission.title }}
            </span>
            <span
              class="col-5"
            >
              {{ mission.start }}
            </span>
            <span
              class="col-5"
            >
              {{ mission.tjm }}
            </span>
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
            </span>
            <div
              v-show="show === true && editOffset === index"
              class="textarea-zone"
            >
              <textarea
                :id="'item-date-notes-' + index"
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
      show: false,
      editOffset : -1
    }
  },
  methods: {
    showNotes(index) {
      this.$data.show = true;
      this.$data.editOffset  = index

    },
    hideNotes() {
      this.$data.show = false;
      this.$data.editOffset  = -1
    }
  }
}
</script>

<style scoped>

</style>
