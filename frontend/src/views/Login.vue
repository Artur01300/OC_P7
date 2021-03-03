<template>
    <div class="container">
        <div class="login-page">
            <div class="form">
              <!--  @submit.prevent="login" pour accéder aux éléments du formulaire -->
              <form class="form-signin" @submit.prevent="login">
                <h2 class="form-signin-heading">Connectez-vous...</h2>

                <!-- v-model crée une liaison de données sur les champs de formulaire -->
                <label for="inputEmail" class="sr-only">Email address</label>
                <input  v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

                <label for="inputPassword" class="sr-only">Mot de passe</label>
                <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                
                <button class="btn btn-lg btn-primary btn-block" type="submit">Conncetion</button>
                <p class="message">Vous n'êtes pas inscrit ? <router-link to="/signup">Create an account</router-link></p>
              </form>
            </div>
        </div> 
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      //je récupère les valeur des chmps de formulaire grâca à v-model-valeur
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:3000/api/auth/login', { email: this.email, password: this.password })
      .then(request => this.loginSuccessful(request))
      .catch(() => this.loginFailed())
    },
    /*
    Quoi qu'il en soit, nous disons à axios que la promesse qu'elle renvoie doit être appelée loginSuccessfulavec 
    l'objet request si tout se passe bien, et si elle ne le fait pas, elle loginFailed doit être appelée
    */
    loginSuccessful (req) {

      //si l'adresse email et mot de passe sonc correct on rédirection ver la  page prancipale
      window.location.href = "/home";
      if (!req.data.token) {
        this.loginFailed()
        return
      }
      localStorage.token = req.data.token
      this.error = false
    },
    loginFailed () {
      alert('Mot de pass ou adresse e-mail incorrecte')
      this.error = 'Login failed!'
      delete localStorage.token
    }
  }
}

</script>

