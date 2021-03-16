<template>
    <div class="container">
      <div v-if="!submitted" class="form">
        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <form class="form-signin" @submit.prevent="handleSubmit(loginSubmit)">
            <h2 class="form-signin-heading">Connectez-vous...</h2>

            <!-- v-model crée une liaison de données sur les champs de formulaire -->
            <label for="inputEmail" class="sr-only">Email address</label>
            <ValidationProvider name="user.email" rules="required|email">
              <div slot-scope="{ errors }">
                <input  v-model="email" type="email" class="form-control" placeholder="Email address" required autofocus>
                <p class="error">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>

            <label for="password" class="sr-only">Mot de passe</label>
             <ValidationProvider name="user.password" rules="required|minmax:3,10">
                <div slot-scope="{ errors }">
                  <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                  <p class="error">{{ errors[0] }}</p>
                </div>
             </ValidationProvider>

            <button class="btn btn-lg btn-primary btn-block" type="submit" v-bind:disabled="invalid">Conncetion</button>
            <p class="message">Vous n'êtes pas inscrit ? <router-link to="/signup">Create an account</router-link></p>
        </form>
        <p>{{ errorMessage }}</p>
      </ValidationObserver>
    </div>
  </div> 
</template>

<script>

import UserUrl from "../service/UserUrl"
import { mapMutations } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'


export default {
  name: 'Login',
  components: {
    ValidationProvider, ValidationObserver
  },
  data () {
    return {
      //je récupère les valeur des chmps de formulaire grâca à v-model-valeur
      email: '',
      password: '',
      submitted: false,
      errorMessage: ""
    }
  },
  methods: {
    // utilisant la fonction utilitaire mapMutations qui attache les méthodes du composant aux appels de store
    ...mapMutations([
      'setid_user',
      'setToken'
    ]),
    /**
      *Fonction de connexion d'un user existant
      * @param {Object} data - Email et password du user
    */
    loginSubmit(){
      let data = {
        email: this.email,
        password: this.password
      }
      UserUrl.login(data)
        .then(response => {
        this.setid_user(response.data.id_user);
        this.setToken(response.data.token);
        this.submitted = true;
        this.$router.push('/home');
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.errorMessage = "Adresse e-mail ou mot de passe invalide !";
        } else if (error.response.status === 429) {
          this.errorMessage = "Vous avez dépassé le nombre maximal de tentatives, merci de réessayer ultérieurement.";
        } else if (error.response.status === 404) {
          this.errorMessage = "Cet email est invalide ou ne correspond à aucun utilisateur connu.";
        }
      })
    }
  }
}

</script>

