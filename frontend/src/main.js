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
});

extend("email", {
    ...email,
    message: "Cet E-mail n'est pas valide !"
});

extend('minmax', {
    validate(value, { min, max }) {
        return value.length >= min && value.length <= max;
    },
    params: ['min', 'max'],
    message: "Le mot de passe doit contenir minimums 7 caractères maximum 20"
});

Vue.use(BootstrapVue)

/*
    Cette méthode permet d'ajouter une fonctionnalité globale à notre instance de Vue et 
    après on peut utiliser dans nos modèles généralement.
*/
Vue.use(Vuex)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationProvider', ValidationObserver)


/*
    Dans l'environnement de développement(=true), Vue fournira de nombreux avertissements pour vous aider à gérer les erreurs et les pièges courants.
    Dans un environnement de production(=fals), ces avertissements sont inutiles.
    De plus, certaines vérifications d'avertissement entraînent une légère surcharge d'exécution, ce qui peut être évité en mode environnement de production.
*/
Vue.config.productionTip = false;

/*
    création d'un data globale pour récupérer le token dans n'importe quelle page
*/
const store = new Vuex.Store({
    //Pour que la session de user persiste
    plugins: [vuexPersistedstate()],
    state: {
        token: null
    },
    mutations: {
        //j'enrégiste le tocken dans le sotre de Vuex
        setToken(state, token) {
            state.token = token;
        },
        logout(state){
            state.token = null;
        }
    },
    actions: {},
    //Le rôle de notre getter est de séparer les données applicatives de la logique applicative et de veiller à ne pas divulguer d'informations sensibles.
    //J'ai créé une fonction qui parmet de vérifier si user est connecter ou pas
    getters: {
        isLoggedIn(state) {//si il y a le token il envoie le true, sinon il envoie le false
            return !!state.token;
        }
    }
});

// Nouvelle instance de vue
new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount('#app');
