<template>
   <div class="container">
        <div class="main wrapper">
            <h1>Inscrivez vous Forum</h1>
            <div class="main-agileinfo">
                <div class="agileits-top">
                    <form v-on:submit.prevent="sentSubmit">
                        <input class="text" type="text" name="name" v-model="form.name" placeholder="Nom" required="">
                        <input class="text email" type="email" name="email" v-model="form.email" placeholder="Email" required="">
                        <input class="text" type="password" name="password" v-model="form.password" placeholder="Mot de passe" required="">
                        <input class="text w3lpass" type="password" name="password" v-model="form.password_confirm" placeholder="Confirmez votre mot de passe" required="">
                        <div class="wthree-text">
                            <!-- <div class="clear"></div> -->
                        </div>
                        <input type="submit" value="Inscription">
                    </form>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
    import axios from "axios";
   
    export default {
        //dans l'objet de configuration on déclar ou vas s'atacher l'application vue (el: '#Signup')
        name: "Signup",

        /*
            propriété « data » qui a comme valeur un objet,
            stocker les données afin de pouvoir les réutiliser et effectuer des actions pour l'utilisateur.
            Elle peut accepter n'importe quelle paire clé - valeur (clé - message, valeur - Hello ?)
        */
        data(){
            return {
                form:{
                    name: "",
                    email : "",
                    password : ""
                }

            }
        },
          //le methodes est un fonction réutilisable
        methods:{
            sentSubmit(){
                
                axios.post("http://localhost:3000/api/auth/signup", this.form)
               .then(function(response) {
                    console.log(response);
                    window.location.href = "/home";
                })
                .catch(err => (console.log(err)))
            }
        }
    }
</script>