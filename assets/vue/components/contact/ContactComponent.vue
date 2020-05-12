<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Informations Personnelles
          </div>
        </h4>
        <div class="text-light font-weight-bold ">
          <span>{{ contact.firstname }}</span>
          <span>{{ contact.lastname }}</span>
        </div>
        <div class="text-light font-weight-bold ">
&nbsp;
        </div>
        <div class="text-light font-weight-bold ">
          <span>{{ contact.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactComponent",
  props: {
    contact:{
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style scoped>

</style>
