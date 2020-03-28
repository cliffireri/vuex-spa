import { getLocalUser } from "./helpers/auth";

const user = getLocalUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        customers: [],
    },
    mutations: {
        login(state){
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload){
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token:payload.access_token});
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, error){
            state.auth_error = error;
            state.loading = false;
        },
        logout(state){
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        }
    },
    getters: {
        isLoading(state){
            return state.loading;
        },
        isLoggedIn(state){
            return state.loading;
        },
        getCurrentUser(state){
            return state.currentUser;
        },
        authError(state){
            return state.auth_error;
        },
        customers(state){
            return state.customers;
        }
    },
    actions: {
        login(context){
            context.commit("login");
        }
    },
}