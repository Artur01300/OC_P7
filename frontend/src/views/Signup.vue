<template>
   <div class="container">
        <div class="main wrapper">
            <h1>Inscrivez vous Forum</h1>
            <div v-if="!submitted" class="main-agileinfo">
              <div class="agileits-top">
                <!--Vee-Validate: ValidationObserver pour suspendre la soumission du formulaire à l'existence ou non d'erreurs-->
                <ValidationObserver v-slot="{ invalid, handleSubmit }">
                  <!-- v-on:submit.preventl'évènement `submit` ne rechargera plus la page -->
                  <form @submit.prevent="handleSubmit(createUser)">

                    <ValidationProvider name="user.name" rules="required|minmax:3,10">
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

                    <input id="signup-btn" type="submit" v-bind:disabled="invalid">
                    
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
    //Utilisation de Vuex pour déterminer les rôles
     ...mapMutations([
       'setUserName',
       'setToken'
     ]),
    /**
    *Fonction de création d'un nouvel utilisateur
    * @param {Object} data - Données de l'utilisateur
    */
    createUser(){
      let data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      };
      //lance la requête  POST
      UserUrlData.signup(data)
      .then(response =>{
        console.log(response.data);
        this.setUserName(response.data.id_user);
        this.setToken(response.data.token);
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