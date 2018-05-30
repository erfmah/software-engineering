<template>
  <nav class="navbar navbar-light bg-faded">
    <div class="container">
      <a class="navbar-brand" href="/">Shop</a>

      <span class="navbar-text float-xs-right" v-if="profile">
        Hello <strong>{{fullName}}</strong>
      </span>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapState({
      profile: state => state.profile.data
    }),
    fullName () {
      return `${this.profile.firstName} ${this.profile.lastName}`
    }
  },
  methods: mapActions([
    'getProfile'
  ]),
  created () {
    this.getProfile()
    console.log(this)
  }
}
</script>
