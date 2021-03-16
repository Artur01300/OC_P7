<template>
   <div v-if="!submitted" class="container">
        <div class="main wrapper">
            <h1>Inscrivez vous Forum</h1>
            <div v-if="!submitted" class="main-agileinfo">
              <div class="agileits-top">
                <!--Vee-Validate: ValidationObserver pour suspendre la soumission du formulaire à l'existence ou non d'erreurs-->
                <ValidationObserver v-slot="{ invalid, handleSubmit }">
                  <form @submit.prevent="handleSubmit(createUser)">

                    <ValidationProvider name="user.name" rules="required|minmax:3,10">
                    <input type="text" placeholder="Name" require v-model="user.name"  name="name"><br>
                    <p class="error">{{ errors[0] }}</p>
                    </ValidationProvider>

                    <ValidationProvider name="user.email" rules="required|email">
                    <input type="text" placeholder="Email" required  v-model="user.email" name="email"><br>
                    <p class="error">{{ errors[0] }}</p>
                    </ValidationProvider>

                    <ValidationProvider name="user.password" rules="required|minmax:3,10">
                    <input type="password" minlength="6" maxlength="10" required v-model="user.password"><br>
                    <p class="error">{{ errors[0] }}</p>
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


import UserUrl from "../service/UserUrl"
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
      errors: []
    }
  },
  methods: {
     ...mapMutations([
       'setid_user',
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
      //lance la requête Axios POST
      UserUrl.signup(data)
      .then(response =>{
        console.log(response.data);
        this.setid_user(response.data.id_user);
        this.setToken(response.data.token);
        this.submitted = true;
        //  window.location.href = "/";
        this.$router.push('/');
      })
      .catch(error => console.log(error));
    }
  }
}

</script>