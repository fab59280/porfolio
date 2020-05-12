<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">
          Entreprise
        </h4>
        <div class="text-light font-weight-bold">
          <p>
            <a :href="'/entreprise' + contact.entreprise.id">
              {{ contact.entreprise.name }} | {{ contact.entreprise.type }}
            </a>
          </p>
          <p v-if="contact.entreprise.siret !== null">
            {{ contact.entreprise.siret }}
          </p>
        </div>
        <div class="text-light font-weight-bold">
          <p>{{ contact.entreprise.address.address }}</p>
          <p>{{ contact.entreprise.address.postcode }} {{ contact.entreprise.address.city }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntrepriseComponent",
  props:{
    contact:{
      type: Object,
      default(){
        return {};
      }
    }
  }
}
</script>

<style scoped>

</style>
