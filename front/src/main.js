import Vue from 'vue'
import VueRouter from 'vue-router'
import accounting from 'accounting'
import pluralize from 'pluralize'

Vue.use(VueRouter);

import App from './App'
import Home from './components/home'
import Login from './components/login'
import Reg from './components/reg'
import Person from './components/person'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/templatemo.css'
import './assets/css/font-awesome.min.css'
import store from './store/index'
import Shop from './components/shop/Shop'
import AddProduct from './components/addProduct'
import AddCategory from './components/AddCategory'

Vue.config.productionTip = false

Vue.filter('formatMoney', accounting.formatMoney)
Vue.filter('pluralize', pluralize)


const routes = [{
  path : '/',
  component : Home,
  meta: { auth: false },
},{
  path : '/login',
  component : Login,
},{
  path : '/reg',
  component : Reg,
  meta: { auth: false },
},{
  path : '/person',
  component : Person
},{
  path : '/shop',
  component : Shop
},{
  path : '/addProduct',
  component : AddProduct
},{
  path : '/AddCategory',
  component : AddCategory
},{
  path : '*',
  component : Home
}];

const router = new VueRouter({
  mode: 'history',
  saveScrollPosition: true,
  routes
});

router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta;
  var isLogin = Boolean(store.state.login.token)

  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  if(isLogin && (path == '/login' || path == '/reg')){
   return next({ path: '/person' })
   }
  next()
});

var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});
