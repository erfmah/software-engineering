<template>
  <div class="container">
    <div class="col-md-12">
      <h1 class="margin-bottom-15">Add Product</h1>
      <form class="form-horizontal templatemo-container templatemo-login-form-1 margin-bottom-30" role="form" method="post" @submit.prevent="addCategory()">
       <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productName" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productName" placeholder="Name" v-model="category.name">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-md-12 text-center">
            <input type="submit" value="add" class="btn btn-info">
            <router-link to="/" class="btn btn-default">Home</router-link>
          </div>
        </div>
      </form>s
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import api from '../api'
  export default {
    data (){
      return {
        category: {
          name: ''
        }
      }
    },
    computed: {
      ...mapActions({
        AddCat: 'AddCat',
      })
    },
    methods:{
      addCategory(){
        this.$store.dispatch('AddCat', this.category);
      }
    },
    created(){
      console.log("api.localGetAllCats()")
    }
  }

</script>
