<template>
  <main>
    <div class="introPage container_form">
      <section v-if="isLoggedIn" class="container home_container text-center"><br><br>
        <div>
          <h1>Bienvenue sur le réseau social de votre entreprise !</h1>
        </div>
        <div class='container'>
          <div class="col-col-sm-5">
            <router-link to="/articles" aria-label="Lien vers la plateforme d'articles">
              <button class="btn btn-primary">Accès au Forum Groupomania</button>
            </router-link><br><br>
          </div>
        </div>
      </section>

      <!--Si le user n'est pas connecté, les liens vers les plateformes ne sont pas disponibles-->
      <section v-else class="container text-center">
        <h1>Pour accéder à votre réseau social de l'entreprise vous devez vous connecter !</h1><br><br>
      </section>

        <!--Importation du  CallToLogin-->
      <CallToLogin v-if="loginCalled" />

      <div> 
        <!--Importation du Identification-->
        <UserIdentification
        :logout="logout"
        :isLoggedIn="isLoggedIn"
          />
        <div class="info">
            <!--Si le user est connecté et non-administrateur, l'icône de son compte s'afficher-->
            <button v-if="isLoggedIn" class="btn btn-primary" @click="showAccount"><i class="fas fa-user"></i> Votre compte</button><br><br>
        </div>
      </div>

      <!--Ecran qui détaille les données du compte-->
      <div v-if="accountAsked">
        
        <h3>Détails de votre compte</h3>
        <p><strong>Pseudo :</strong> {{ name }}</p>
        <p><strong>Email:</strong> {{ email }}</p>

        <div class="btns-space">
          <b-button variant="danger" class="btn" @click="confirmDelete"><i class="far fa-trash-alt"></i><strong> Supprimer votre compte</strong></b-button>
          <b-button variant="success" class="btn" @click="hideAccount"><i class="fas fa-arrow-left"></i><strong> Retour</strong></b-button>
        </div>
      </div>
      <!--Ecran qui demande confirmation pour la suppression du compte-->
      <div v-if="confirmation">
        <p>Etes-vous sûr de vouloir supprimer votre compte ? Toute suppression est définitive.</p>
        <div class="confirmSuppress">
          <b-button variant="danger" type= "button" @click="suppressUser">Supprimer</b-button>
          <b-button variant="success" type= "button" @click="refreshPage">Annuler</b-button>
        </div>
      </div>
    </div> 
  </main>
</template>

<script>

import UserIdentification from "../components/UserIdentification"
import CallToLogin from "../components/CallToLogin"
import UserUrlData from "../service/UserUrlData"
import { mapGetters, mapState } from 'vuex'  
    
export default {
	name: "Home",
	components: {
  CallToLogin, UserIdentification
	},
	data() {
  return {
      loginCalled: false,
      accountAsked: false,
      email: "",
      name: "",
      confirmation: false
    }
  },
	computed: {
    //Utilisation de Vuex pour déterminer les rôles et les autorisations du user (toutes ces informations étant conservées dans le store Vuex)
    ...mapGetters(['isLoggedIn']),
    ...mapState({ token: "token"})
	},
	methods: {
    //Fonction d'appel du component CallToLogin
    CallToLogin() {
      if (this.isLoggedIn == false) {
        this.loginCalled = true;
      }
    },
  
    //Fonction de déconnexion
    logout() {
      this.$store.commit("logout");
      this.$router.push({ path: "/" });
      localStorage.clear();
    },
    //Fonction d'affichage des données du user courant
    showAccount() {
      this.accountAsked = true
    },
    //Fonction de masquage des données du compte
    hideAccount() {
      this.accountAsked = false
    },

    // Fonction de récupération des données du user courant via une requête Axios GET

    showUser() {
     UserUrlData.getCurrentUser({Authorization: this.token})
      .then(response => {
      //   console.log(response)
        this.userInformation = JSON.parse(JSON.stringify(response.data.data[0]));
        this.name = this.userInformation.name,
        this.email = this.userInformation.email
      })
      .catch(error => console.log(error));
    },
    
    // Fonction de suppression du compte user courant via une requête  DELETE
    suppressUser() {
    UserUrlData.deltAccount({Authorization: this.token}) 
      .then(response => {
        console.log(response.data);
        alert('Votre compt a bien été supprimé !')
        this.isLoggedIn = false;
        this.logout();
        this.refreshPage();
      })
      .catch(error => console.log(error));
    },
    //Fonction d'affichage de la demande de confirmation de suppression
    confirmDelete() {
      return (this.confirmation = true);
    },
    //Fonction de rafraîchissement de la page
    refreshPage() {
      this.hideAccount();
      this.confirmation = false;
    },
	},
  // Déclenchement de la récupération des données du user au moment du rendu de la page 
  mounted() {
    this.showUser(this.token);
  },
}
</script>

<style>
  .btns-space{
    display: flex;
    justify-content: space-around;
    width: 400px;
    margin: auto;
  }

  .confirmSuppress{
    display: flex;
    align-items: center;
    justify-content: space-evenly
  }

  .header-main {
    padding-bottom: 150px;
  }

  .container_form{
    padding-top: 200px;
    max-width: 800px;
    margin: auto;
  }

  .home_container{
    background: rgba(0, 0, 0, 0.18);;
  }
  .card_color {
    background-color: none;
  }
  .logo-header {
    height: 80px;
    width: 100vw;
    padding: 20px 0px 20px 0px;
    position: fixed;
    box-shadow: -5px -5px 15px #ffffff, 5px 5px 15px #335080;
    display: flex;
    align-items: center;
  }
  .main-principale {
    padding-top: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .containter-form {
    box-shadow: -5px -5px 15px #d1c3ec, 5px 5px 15px #445f8a;
  }

  .login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
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

  .like-dislikes {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .central-meta {
    background: #fdfdfd none repeat scroll 0 0;
    border: 1px solid #ede9e9;
    border-radius: 3px;
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
    padding: 25px;
  }

  .new-postbox {
    display: inline-block;
    width: 100%;
  }

  .new-postbox > figure {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: top;
    width: 10.4%;
  }

  .newpst-input {
    display: inline-block;
    margin-left: 10px;
    vertical-align: top;
    width: 85.5%;
  }

  .newpst-input > form {
    display: inline-block;
    width: 100%;
  }

  .newpst-input textarea {
    float: left;
    width: 100%;
  }

  .attachments {
    border: 1px solid #eee;
    display: block;
    padding: 10px;
    text-align: right;
    border-top: 0;
    background: #fff;
  }

  .attachments > ul {
    list-style: outside none none;
    margin-bottom: 0;
    padding-left: 0;
  }

  .attachments li {
    display: inline-block;
    margin-left: 5px;
  }

  .clear {
    clear: both;
  }

  body {
    background: linear-gradient(to top, #66a144, #d5f0c6);
    background-size: cover;
    background-attachment: fixed;
  }

  h1 {
    font-size: 3em;
    text-align: center;
    color: #fff;
    font-weight: 100;
    text-transform: capitalize;
    letter-spacing: 4px;
  }

  .main {
    padding: 3em 0 1em;
  }

  .main-agileinfo {
    width: 35%;
    margin: 3em auto;
    background: rgba(0, 0, 0, 0.18);
    background-size: cover;
  }

  .agileits-top {
    padding: 3em;
  }

  input[type=text], input[type=email], input[type=password] {
    font-size: 0.9em;
    color: #fff;
    font-weight: 100;
    width: 94.5%;
    display: block;
    border: none;
    padding: 0.8em;
    border: solid 1px rgba(255, 255, 255, 0.37);
    -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, #fff 4%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #fff 4%);
    background-position: -800px 0;
    background-size: 100%;
    background-repeat: no-repeat;
    color: #fff;
    font-family: "Roboto", sans-serif;
  }

  input.email, input.text.w3lpass {
    margin: 2em 0;
  }

  ::-webkit-input-placeholder {
    color: #fff;
    font-weight: 100;
  }

  input[type=submit] {
    font-size: 0.9em;
    color: #fff;
    background: #76b852;
    outline: none;
    border: 1px solid #76b852;
    cursor: pointer;
    padding: 0.9em;
    -webkit-appearance: none;
    width: 100%;
    margin: 2em 0;
    letter-spacing: 4px;
  }

  .agileits-top p a {
    color: #fff;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    transition: 0.5s all;
    font-weight: 400;
  }

  @media (max-width: 568px) {
    .main-agileinfo {
      width: 75%;
    }
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 1.8em;
      letter-spacing: 3px;
    }

    .agileits-top {
      padding: 1.8em;
    }

    input[type=text], input[type=email], input[type=password] {
      width: 91%;
    }

    .agileits-top p {
      font-size: 0.9em;
    }
  }
  @media (max-width: 414px) {
    h1 {
      font-size: 1.8em;
      letter-spacing: 2px;
    }

    .main-agileinfo {
      width: 85%;
      margin: 1.5em auto;
    }

    .text:focus, .text:valid {
      background-position: 0 0px;
    }

    .wthree-text ul li, .wthree-text ul li:nth-child(2) {
      display: block;
      float: none;
    }

    .wthree-text ul li:nth-child(2) {
      margin-top: 1.5em;
    }

    input[type=submit] {
      margin: 2em 0 1.5em;
      letter-spacing: 3px;
    }

    input[type=submit] {
      margin: 2em 0 1.5em;
    }

    .colorlibcopy-agile {
      margin: 1em 0 1em;
    }
  }
  @media (max-width: 384px) {
    .main-agileinfo {
      width: 88%;
    }
  }
  @media (max-width: 375px) {
    .agileits-top p {
      letter-spacing: 0px;
    }
  }
  @media (max-width: 320px) {
    .main-w3layouts {
      padding: 1.5em 0 0;
    }

    .agileits-top {
      padding: 1.2em;
    }

    input[type=text], input[type=email], input[type=password] {
      width: 89.5%;
      font-size: 0.85em;
    }

    h1 {
      font-size: 1.7em;
      letter-spacing: 0px;
    }

    .main-agileinfo {
      width: 92%;
      margin: 1em auto;
    }

    .text:focus, .text:valid {
      background-position: 0 0px;
    }

    input[type=submit] {
      margin: 1.5em 0;
      padding: 0.8em;
      font-size: 0.85em;
    }

    .wthree-text label {
      font-size: 0.85em;
    }

    .main-w3layouts {
      padding: 1em 0 0;
    }
  }

</style>