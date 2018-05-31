import api from '../api'
import { USER_SIGNIN, USER_SIGNOUT, USER_REG, ADD_CAT, RECIEVE_CATEGORIES } from './types'

export const UserLogin = ({ commit }, data) => {
    api.localLogin(data).then(function(response) {
            if (response.data.status == "success") {
                commit(USER_SIGNIN, response.data.data);
                window.location = '/person'
            } else {
                window.location = '/login'
            }
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const AddCat = ({ commit }, data) => {
  api.localAddCat(data).then(function(response) {
          if (response.data.status == "success") {
              window.location = '/AddCat'
          } else {
              window.location = '/AddCat'
          }
      })
      .catch(function(error) {
          console.log(error);
      });
};

export const UserLogout = ({ commit }, data) => {
        commit(USER_SIGNOUT);
        window.location = '/login'
};

export const UserReg = ({ commit }, data) => {
    api.localReg(data).then(function(response) {
            if (response.data.status == "success") {
                commit(USER_REG, response.data.data);
                window.location = '/person'
            } else {
                window.location = '/reg'
            }
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const getProfile = ({ commit }) => {
      let profile = localStorage.getItem("user")
      profile = JSON.parse(profile)
      commit('RECEIVE_PROFILE', profile)
  }
  
  export const getProducts = ({ commit }) => {
    api.getProducts(products => {
      commit('RECEIVE_PRODUCTS', products)
    })
  }
  
  export const getPromotions = ({ commit }) => {
    api.getPromotions(promotions => {
      commit('RECEIVE_PROMOTIONS', promotions)
    })
  }
  
  export const addToCart = ({ commit }, product) => {
    if (product.inventory > 0) {
      commit('ADD_TO_CART', product.id)
    }
  }
  
  export const removeFromCart = ({ commit }, product) => {
    commit('REMOVE_FROM_CART', product)
  }
  
  export const toggleCoupon = ({ commit }, coupon) => {
    commit('TOGGLE_COUPON', coupon)
  }
  
  export const getCategories = ({ commit },) => {
    const cats = api.localGetAllCats().then(function(cats){
        commit (RECIEVE_CATEGORIES, cats.data)
    })
  }