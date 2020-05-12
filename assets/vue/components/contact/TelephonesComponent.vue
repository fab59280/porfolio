<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Téléphones
          </div>
          <div class="stretch-title-item link stretch-title-item-add ">
            +
          </div>
        </h4>
        <div
          v-if="contact.telephones.length > 0"
          class="text-light font-weight-bold"
        >
          <div
            v-for="phone in contact.telephones"
            :key="phone.id"
            class="justify-content-between"
          >
            <span class="col-6">
              <a
                :href="'tel:' + phone.telephone"
                :title="'Téléphoner ' + phone.telephone"
              > {{ phone.telephone }}</a>
            </span>
            <span class="col-6"> {{ phone.type }}</span>
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
  name: "TelephonesComponent",
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
