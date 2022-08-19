<template>
  <div v-if="!isLoggedIn" class="container containerForm">
    <div v-if="!submitted" class="form">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="form-signin" @submit.prevent="handleSubmit(loginSubmit)">
          <h2 class="form-signin-heading">Connectez-vous...</h2>

          <!-- je récupère les valeur des chmps de formulaire grâca à v-model=valeur -->
          <label for="inputEmail" class="sr-only">Email address</label>
          <ValidationProvider name="user.email" rules="required|email">
            <div class="paddForm" slot-scope="{ errors }">
              <input v-model="email" type="email" class="form-control" placeholder="Email address" required autofocus>
              <p class="error">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <label for="password" class="sr-only">Mot de passe</label>
          <ValidationProvider name="user.password" rules="required|minmax:7,30">
            <div class="paddForm" slot-scope="{ errors }">
              <input v-model="password" type="password" class="form-control" placeholder="Password" required>
              <p class="error">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
            
          <button class="btn btn-primary btn-block" type="submit">Connexion</button>
            <p class="message">Vous n'êtes pas inscrit ? <router-link to="/signup">Create an account</router-link></p>
        </form>
        <p>{{ errorMessage }}</p>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>

import UserUrlData from "../service/UserUrlData";
import { mapMutations, mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';


export default {
  name: "articles-list",
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
  computed: {//j'ai défini des valeurs réutilisables qu'ils sont liés avec propirété data
    ...mapGetters(['isLoggedIn'])
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
        this.$router.push('/articles');
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.errorMessage = "Adresse e-mail ou mot de passe invalide !";
        }
        else if(error.response.status === 405){//Si user est supprimé son compte, il peut pas se connécter à nouveau
          alert('Utilisateur non autorisé !');
        }
        else if (error.response.status === 429) {
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
  .paddForm{
    padding-left: 10px;
  }
  .form {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.18);
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  outline: 0;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover, .form button:active, .form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #f3e7e7;
  font-size: 12px;
}
.form .message a {
  color: #afeeb1;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
  @media screen and (max-width : 600px) and (max-width : 1024px) {
      .containerForm{
      padding-top: 200px;
    }
  }
</style>
