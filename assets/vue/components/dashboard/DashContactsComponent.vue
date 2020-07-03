<template>
  <div class="d-flex justify-content-between align-items-center row row-list">
    <div class="text-light font-weight-bold col-4">
      <span
        class="link link--special"
        @click="$router.push('/contact-' + contact.id)"
      >
        {{ contact.firstname }} {{ contact.lastname }}
      </span>
    </div>

    <div class="text-light font-weight-bold col-4">
      {{ contact.role }}
    </div>

    <div class="text-info font-weight-bold d-flex justify-content-between align-items-center text-extra-small col-4">
      <a
        v-if="contact.mails.length > 0"
        :href="'mailto:' + contact.mails[0].email"
        :title="'send a mail to ' + contact.mails[0].email"
        class="card-link card-link-primary"
      >{{ contact.mails[0].email }}</a>
      <span v-else>-</span>
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
