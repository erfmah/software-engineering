<template>
  <div class="container">
    <div class="col-md-12">
      <h1 class="margin-bottom-15">Add Product</h1>
      <form class="form-horizontal templatemo-container templatemo-login-form-1 margin-bottom-30" role="form" method="post" @submit.prevent="addProduct()">
       <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productName" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productName" placeholder="Name" v-model="product.Name">
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productPrice" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productPrice" placeholder="Price" v-model="product.Price">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productWeight" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productWeight" placeholder="Weight" v-model="product.Weight">
            </div>
          </div>
        </div>

                <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productCategory_ID" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <select class="form-control" id="productCategory_ID" placeholder="Category_ID" v-model="product.Category_ID">
                <option v-for="cat in categories" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
          </div>
        </div>

                <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productManufacture_ID" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productManufacture_ID" placeholder="Manufacture_ID" v-model="product.Manufacture_ID">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productCatDesc" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productCatDesc" placeholder="CatDesc" v-model="product.CatDesc">
            </div>
          </div>
        </div>
        
        <!-- start of input -->
        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productShortDesc" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productShortDesc" placeholder="ShortDesc" v-model="product.ShortDesc">
            </div>
          </div>
        </div>
        <!-- end of input -->

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productLongDesc" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productLongDesc" placeholder="LongDesc" v-model="product.LongDesc">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productProduct_Stock" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productProduct_Stock" placeholder="Product_Stock" v-model="product.Product_Stock">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productLive" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productLive" placeholder="Live" v-model="product.Live">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productThumb" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <input type="text" class="form-control" id="productThumb" placeholder="Thumb" v-model="product.Thumb">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <div class="control-wrapper">
              <label for="productUpdateDate" class="control-label fa-label"><i class="fa fa-user fa-medium"></i></label>
              <datepicker placeholder = "UpdateDate" v-model="product.UpdateDate"></datepicker>
            </div>
          </div>
        </div>


        <div class="form-group">
          <div class="col-md-12 text-center">
            <input type="submit" value="add" class="btn btn-info">
            <router-link to="/" class="btn btn-default">Home</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    data (){
      return {
        product: {
          Category_ID: '',
          Manufacture_ID: '',
          Name: '',
          Price: '',
          Weight: '',         
          CatDesc: '',
          ShortDesc: '',
          LongDesc: '',
          Thumb: '',
          UpdateDate: '',
          Live: '',
          Product_Stock:''
        }
      }
    },
    computed: mapState({
      categories: state => state.admin.categories
    }),
    methods: mapActions([
      'getCategories'
    ]),
    created(){
      this.getCategories()
    }
  }

</script>
