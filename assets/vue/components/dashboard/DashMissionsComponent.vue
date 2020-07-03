<template>
  <div class="d-flex justify-content-between align-items-center row row-list">
    <div class="text-light font-weight-bold col-5">
      <span
        class="link link--special"
        @click="redirectToEntreprise"
      >
        {{ mission.title }}
      </span>
    </div>

    <div class="text-light font-weight-bold col-3">
      {{ mission.start }}
    </div>

    <div class="text-light font-weight-bold col-3">
      {{ mission.end }}
    </div>

    <div class="text-light font-weight-bold col-1">
      {{ mission.tjm }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DashMissionsComponent",
  props: {
    mission: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      entreprise: {}
    }
  },
  methods: {
    redirectToEntreprise() {
      this.getEntreprise()
        .then(() => {
          if(this.$data.entreprise.id !== undefined) {
            this.$router.push('/entreprise-' + this.$data.entreprise.id);
          }
        })
        .catch(error => {
          console.log(error);
        });

    },
    async getEntreprise() {
      await this.$store.dispatch("mission/findEntreprise", '/api/missions/' + this.mission.id + '/entreprise')
        .then(data => {
          this.$data.entreprise = data;
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>
