<template>
  <div class="container">
    <div class="col-md-12">
      <h1 class="margin-bottom-15">Register</h1>
      <form class="form-horizontal templatemo-container templatemo-login-form-1 margin-bottom-30" role="form" method="post" @submit.prevent="reg()">
       <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="userfirstname" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="userfirstname" placeholder="firstName" v-model="user.firstName">
             
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="userlastname" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="userlastname" placeholder="lastName" v-model="user.lastName">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="userphone" class="control-label fa-label"><i class="fa fa-phone fa-medium"></i></label>
              <input type="text" class="form-control" id="userphone" placeholder="phone" v-model="user.phone">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="userbirthday" class="control-label fa-label"><i class="fa fa-calendar-o fa-medium"></i></label>
              <!--<input type="text" class="form-control" id="userbirthdate" placeholder="birthdate" v-model="user.birthdate"> -->
              <datepicker placeholder = "birthdate" v-model="user.birthdate"></datepicker>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="useremail" class="control-label fa-label"><i class="fa fa-envelope fa-medium"></i></label>
              <input type="text" class="form-control" id="useremail" placeholder="email" v-model="user.email">
            </div>
          </div>
        </div>
        
        <!-- start of input -->
        <div class="form-group">
          <div class="col-md-12">
            <div class="control-wrapper">
              <label for="password" class="control-label fa-label"><i class="fa fa-lock fa-medium"></i></label>
              <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password">
            </div>
          </div>
        </div>
        <!-- end of input -->
        <div class="form-group">
          <div class="col-md-12">
            <div class="control-wrapper">
              <label for="password" class="control-label fa-label"><i class="fa fa-lock fa-medium"></i></label>
              <input type="password" class="form-control" id="password_r" placeholder="Retype Password" v-model="user.password_r">
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
  import Datepicker from 'vuejs-datepicker'
  export default {
    components: {Datepicker},
    data (){
      return {
        user: {
          firstName: '',
          lastName: '',
          birthdate: '',
          email: '',
          password: '',
          password_r: '',
          phone: ''
        }
      }
    },
    computed: {
      ...mapActions({
        UserReg: 'UserReg',
      })
    },
    methods:{
      reg(){
        this.$store.dispatch('UserReg', this.user);
      }
    }
  }

</script>
