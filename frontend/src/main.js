import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuexPersistedstate from 'vuex-persistedstate'
import Vuex from 'vuex'

// Import Bootstrap an BootstrapVue CSS files
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Configuration de Vee-Validate pour la validation des inputs du login et du signup
import { ValidationProvider, extend } from "vee-validate"
import { required, email } from "vee-validate/dist/rules"
import { ValidationObserver } from "vee-validate"

//Permet d'afficher les message si les inputes sont mal romplies
extend("required", {
    ...required,
    message: "Remplire ce champ SVP !"
})
extend("email", {
    ...email,
    message: "Cet E-mail n'est pas valide !"
})
extend('minmax', {
    validate(value, { min, max }) {
        return value.length >= min && value.length <= max;
    },
    params: ['min', 'max'],
    message: "Le mot de passe doit contenir au moins 6 caractères !"
})

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationProvider', ValidationObserver)

Vue.config.productionTip = false

const store = new Vuex.Store({
    plugins: [vuexPersistedstate()],
    state: {
        token: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        logout(state){
            state.token = null;
        }
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        }
    }
})

new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount('#app')

