<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="text-light font-weight-bold">
      {{ mission.name }}
    </div>
    <div class="text-info font-weight-bold d-flex justify-content-between align-items-center text-extra-small">
      used
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
    },
  }
}
</script>
