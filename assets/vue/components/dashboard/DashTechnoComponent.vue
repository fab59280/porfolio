<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="text-light font-weight-bold">
      {{ techno.name }}
    </div>
    <div class="text-info font-weight-bold d-flex justify-content-between align-items-center text-extra-small">
      used
    </div>
  </div>
</template>

<script>
export default {
  name: "DashTechnoComponent",
  props: {
    techno: {
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
