<template>
  <div class="form-row">
    <div class="col-3">
      <label for="name">Name</label>
      <input
        v-model="techno.name"
        type="text"
        class="form-control"
        name="name"
      >
    </div>
    <div class="col-3">
      <label for="tjmRegion">Tjm Region</label>
      <input
        v-model="techno.tjmRegion"
        type="text"
        class="form-control"
        name="tjmRegion"
      >
    </div>
    <div class="col-3">
      <label for="tjmFrance">Tjm France </label>
      <input
        v-model="techno.tjmFrance"
        type="text"
        class="form-control"
        name="tjmFrance"
      >
    </div>
    <div class="col-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="createPost()"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Techno",
  props: {
    techno: {
      type: Object,
      required: true
    }
  }
}
</script>
