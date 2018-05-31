import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import login from './modules/login'
import products from './shop/modules/products'
import profile from './shop/modules/profile'
import promotions from './shop/modules/promotions'
import shoppingCart from './shop/modules/shopping-cart'
import admin from './shop/modules/admin'


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    login,
    products,
    profile,
    promotions,
    shoppingCart,
    admin
  },
  strict: debug
})
