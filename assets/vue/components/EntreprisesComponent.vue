<template>
  <div class="form-row">
    <div class="col-4">
      {{ entreprise.name }}
    </div>
    <div class="col-4">
      {{ entreprise.type }}
    </div>
    <div class="col-4">
      {{ entreprise.address.city }}
    </div>
    <div class="col-4">
      {{ entreprise.tjmFrance }}
    </div>
    <div class="col-4">
      <button
        type="button"
        class="btn btn-dark"
        @click="voirEntreprise(entreprise.id)"
      >
        Détails
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntreprisesComponent",
  props: {
    entreprise: {
      type: Object,
      required: true
    }
  },
  methods: {
    voirEntreprise(id) {
      location.href = "/vue/entreprise-" + id;
    }
  }
}
</script>
