<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="text-light font-weight-bold">
      {{ contact.firstname }} {{ contact.lastname }}
    </div>

    <div class="text-light font-weight-bold">
      {{ contact.entreprise.name }}
    </div>

    <div class="text-info font-weight-bold d-flex justify-content-between align-items-center text-extra-small">
      <a
        :href="'mailto:' + contact.mails[0].email"
        :title="'send a mail to ' + contact.mails[0].email"
        class="card-link card-link-primary"
      >{{ contact.mails[0].email }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashContactsComponent",
  props: {
    contact: {
      type: Object,
      required: true
    },
  }
}
</script>
