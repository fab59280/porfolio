<template>
  <div class="d-flex justify-content-between align-items-center row row-list">
    <div
      v-if="entreprise.name"
      class="text-light font-weight-bold col-3"
    >
      <span
        class="link link--special"
        @click="$router.push('/entreprise-' + entreprise.id)"
      >
        {{ entreprise.name }}
      </span>
    </div><div
      v-else
      class="text-light font-weight-bold col-3"
    >
      -
    </div>

    <div
      v-if="entreprise.type"
      class="text-light font-weight-bold col-3"
    >
      {{ entreprise.type }}
    </div><div
      v-else
      class="text-light font-weight-bold col-3"
    >
      -
    </div>

    <div
      v-if="entreprise.siret"
      class="text-light font-weight-bold col-3"
    >
      {{ entreprise.siret }}
    </div>
    <div
      v-else
      class="text-light font-weight-bold col-3"
    >
      -
    </div>
    <div
      v-if="entreprise.address.city !== undefined"
      class="text-light font-weight-bold col-3"
    >
      {{ entreprise.address.city }}
    </div>
    <div
      v-else
      class="text-light font-weight-bold col-3"
    >
      -
    </div>
  </div>
</template>

<script>
export default {
  name: "DashEntreprisesComponent",
  props: {
    entreprise: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  }
}
</script>
