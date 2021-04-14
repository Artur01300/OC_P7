<template>
    <div class="container containerForm">
      <div v-if="!submitted" class="form">
        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <form class="form-signin" @submit.prevent="handleSubmit(loginSubmit)">
            <h2 class="form-signin-heading">Connectez-vous...</h2>

            <!-- v-model crée une liaison de données sur les champs de formulaire -->
            <label for="inputEmail" class="sr-only">Email address</label>
            <ValidationProvider name="user.email" rules="required|email">
              <div slot-scope="{ errors }">
                <input v-model="email" type="email" class="form-control" placeholder="Email address" required autofocus>
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

            <button class="btn btn-primary btn-block btn-sm" type="submit" v-bind:disabled="invalid">Conncetion</button>
            <p class="message">Vous n'êtes pas inscrit ? <router-link to="/signup">Create an account</router-link></p>
        </form>
        <p>{{ errorMessage }}</p>
      </ValidationObserver>
    </div>
  </div> 
</template>

<script>

import UserUrlData from "../service/UserUrlData"
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
      errorMessage: ''
    }
  },
  methods: {
    /*
      utilisant la fonction mapMutations me permet d'attacher les méthodes du composant(setToken) aux appels de store,
      c'est à dire j'enrégiste le tocken dans le sotre de Vuex
    */
    ...mapMutations(['setToken']),
  
    loginSubmit(){
      let data = {
        email: this.email,
        password: this.password
      }
      UserUrlData.login(data)
        .then(response => {
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
        }
      })
    }
  }
}

</script>

<style>

  .containerForm{
    padding-top: 300px;
  }

  @media screen and (max-width : 600px) and (max-width : 1024px) {
    .containerForm{
    padding-top: 200px;
  }
  }

</style>
