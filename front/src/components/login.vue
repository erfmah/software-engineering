<template>
  <div class="container">
    <div class="col-md-12">
      <h1 class="margin-bottom-15">Login</h1>
      <form class="form-horizontal templatemo-container templatemo-login-form-1 margin-bottom-30" role="form" method="post" @submit.prevent="sub()">
        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="username" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="username" placeholder="Phone" v-model="user.phone">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <div class="control-wrapper">
              <label for="password" class="control-label fa-label"><i class="fa fa-lock fa-medium"></i></label>
              <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12 text-center">
            <input type="submit" value="Submit" class="btn btn-info">
            <router-link to="/" class="btn btn-default">Home</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data (){
      return {
        user: {
          phone : '',
          password: ''
        }
      }
    },
    computed: {
      ...mapActions({
        UserLogin: 'UserLogin',
      })
    },
    methods:{
      sub(){
        this.$store.dispatch('UserLogin', this.user);
      }
    }
  }

</script>
