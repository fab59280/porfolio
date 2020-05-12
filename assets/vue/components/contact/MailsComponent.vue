<template>
  <div class="col-12 col-sm-6 col-md-6 col-xl-4 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title stretch-title">
          <div class="stretch-title-item">
            Emails
          </div>
          <div class="stretch-title-item link stretch-title-item-add ">
            +
          </div>
        </h4>
        <div
          v-if="contact.mails.length > 0"
          class="text-light font-weight-bold"
        >
          <p
            v-for="mail in contact.mails"
            :key="mail.id"
          >
            <a
              :href="'mailto:' + mail.email"
              :title="'Mailto ' + mail.email"
            > {{ mail.email }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailsComponent",
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
