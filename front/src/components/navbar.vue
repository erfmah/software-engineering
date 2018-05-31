<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/person">profile</router-link>

    <router-link to="/login" v-if="!user">login</router-link>
    <router-link to="/reg" v-if="!user">register</router-link>
    <router-link to="/shop" v-else >Shop</router-link>
    <router-link to="/addProduct">Add Product</router-link>
    <router-link to="/AddCategory">Add Category</router-link>
    <a href="javascript:void(0)"  @click="logout" >logout</a>
  </div>
</template>
<script>
  import { mapGetters ,mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        UserInfo:"UserInfo"
      }),
      ...mapActions({
        UserLogout:"UserLogout"
      }),
      user(){
        return this.UserInfo
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('UserLogout');
      }
    }
  }
</script>
