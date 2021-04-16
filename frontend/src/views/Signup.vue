<template>
   <div class="container  agileites_padding">
        <div class="main wrapper">
            <h1>Inscrivez vous</h1>
            <div class="main-agileinfo">
              <div class="agileits-top">
                <!--Vee-Validate: ValidationObserver pour suspendre la soumission du formulaire si il y a des erreurs-->
                <ValidationObserver v-slot="{ handleSubmit }"><!--v-slot déclanche la validation-->
                  <!-- Ici si le formulaire est valide alors on créer un utilisateur -->
                  <form @submit.prevent="handleSubmit(createUser)"><!--soumition de formulaire sans redirection-->

                    <ValidationProvider name="user.name" rules="required">
                      <div slot-scope="{ errors }">
                        <input type="text" placeholder="Name" require v-model="user.name"  name="name"><br>
                        <p class="error">{{ errors[0] }}</p>
                      </div>
                    </ValidationProvider>

                    <ValidationProvider name="user.email" rules="required|email">
                      <div slot-scope="{ errors }">
                        <input type="text" placeholder="E-mail" required  v-model="user.email" name="email"><br>
                        <p class="error">{{ errors[0] }}</p>
                      </div>
                    </ValidationProvider>

                    <ValidationProvider name="user.password" rules="required|minmax:3,10">
                      <div slot-scope="{ errors }">
                        <input type="password" placeholder="Password" minlength="6" maxlength="10" required v-model="user.password"><br>
                        <p class="error">{{ errors[0] }}</p>
                      </div>
                    </ValidationProvider>
                    <!-- si le formulaire n'est pas correct alors on désactive l'input d'envoie du formulaire-->
                    <input id="signup-btn" type="submit">
                    
                  </form>
                </ValidationObserver>
              </div>
            </div>
        </div>    
    </div>
</template>

<script>


import UserUrlData from "../service/UserUrlData"
import { mapMutations } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {

  name: 'Signup',
  components: {
    ValidationProvider, ValidationObserver
  },
  data (){
    return {
      user:{
        name: "",
        email: "",
        password: ""
      },
      submitted: false,
      foundError: false,
      errors: []
    }
  },
  methods: {
    //Utilisation mapMutations de Vuex pour enrégistrer le token
    ...mapMutations([
      'setToken'
    ]),

    createUser(){
      let data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      };
      //lance la requête  POST
      UserUrlData.signup(data)
      .then(response =>{
        this.setToken(response.data.token);
        alert('Bienvenu(e) À Votre Réseau Social De L\'entreprise')
        this.submitted = true;
        this.$router.push('/');
      })
      .catch(error => {
        if(error.response.status === 500){
          alert('Cette adresse e-mail exite déjà !')
        }
      });
    }
  }
}

</script>

<style>
  .agileites_padding{
    padding-top: 200px;
  }
</style>