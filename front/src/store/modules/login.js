import { USER_SIGNIN, USER_SIGNOUT, USER_REG } from '../types'

var isLoggedIn = function() {
    var token = localStorage.getItem('user_token');
    if (token) {
        var payload = JSON.parse(window.atob(token.split('.')[1]));
        if (payload.exp > Date.now() / 1000) {
            return JSON.parse(localStorage.getItem('user_token'))
        }
    } else {
        return false;
    }
};

const state = {
    token: isLoggedIn() || null,
    profile: {}
};

const mutations = {
    [USER_SIGNIN](state, user) {
        localStorage.setItem('user_token', JSON.stringify(user.token_data.access_token));
        localStorage.setItem('user', JSON.stringify(user.user));
        state.profile = user.user
    },
    [USER_SIGNOUT](state) {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
        state.token = null;
        state.profile = null;
    },
    [USER_REG](state, user) {
        localStorage.setItem('user_token', JSON.stringify(user.token_data.access_token));
        localStorage.setItem('user', JSON.stringify(user.user));
        state.profile = user.user
    }
}

export default {
    state,
    mutations
}