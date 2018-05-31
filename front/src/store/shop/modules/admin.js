const state = {
    categories: []
  }
  
  const mutations = {
    RECIEVE_CATEGORIES (state, cats) {
      state.categories = cats
    }
  }
  
  export default {
    state,
    mutations
  }
  