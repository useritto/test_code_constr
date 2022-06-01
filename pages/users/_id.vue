<template lang="pug">
  .user-page
    v-card.mx-auto(v-if="user" max-width="375")
      v-app-bar(dark color="dark")
        v-btn(icon tile depressed nuxt plain to="/users" color="primary")
          v-icon mdi-chevron-left
        v-spacer
        v-toolbar-title {{ user.name }}
        v-spacer
      v-list
      template(v-for="item in items")
        v-list-item(:key="item.id")
          v-list-item-icon
            v-icon(color="grey") {{ item.icon }}
          v-list-item-content
            v-list-item-title {{ item.title }}
            v-list-item-subtitle {{ item.subtitle }}
        v-divider(inset)
</template>

<script>
export default {
  name: 'UserPage',
  data() {
    return {
      user: null,
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    items() {
      if (!this.user) {
        return []
      }

      return [
        { id: 1, icon: 'mdi-account-circle', title: this.user.username, subtitle: 'Никнейм' },
        { id: 2, icon: 'mdi-phone', title: this.user.phone, subtitle: 'Личный номер' },
        { id: 3, icon: 'mdi-email', title: this.user.email, subtitle: 'Email' },
        { id: 4, icon: 'mdi-web', title: this.user.website, subtitle: 'Сайт' },
        { id: 5, icon: 'mdi-office-building-marker-outline', title: this.user.company.name, subtitle: this.user.company.catchPhrase },
        {
          id: 6,
          icon: 'mdi-map-marker',
          title: `${this.user.address.suite}, ${this.user.address.street} street`,
          subtitle: `${this.user.address.city}, ${this.user.address.zipcode} street`
        }
      ]
    }
  },
  fetch() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.user = await this.$api.users.userGet({
        id: this.userId
      });
    }
  }
}
</script>
