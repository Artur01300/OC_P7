<template>
  <main>
    <div class="introPage container_form">
      <div class="btnScratchContainer" v-on:click="btnScratchAction()" v-if="seenVoirPLus" v-show="ofContainerByAvatar">
        <AvatarItem
          :avatar="storedUserAvatar"
          :altName="name"
        />
          <button class="btnScratch">Voir Plus</button>
      </div>
      <transition name="fade">
        <div v-if="btnScratch" v-show="ofContainerByAvatar" class="mainScratch">
          <!--Ecran qui détaille les données du compte-->
          <div class="accountAsked" v-if="accountAsked">
           <div class="avatarContainer">
             <!-- <input type="file" class="btn-info" id="image" ref="image" v-on:change="AvatarImgUpload()" accept="image/*"/> -->
              <a href="/avatar">
                <AvatarItem
                  :avatar="storedUserAvatar"
                  :altName="name"
                />
              </a>
            </div>
            <p>{{ name }}</p>
            <p>{{ email }}</p>

            <div class="btns-space" v-if="seenAvoidDelBdn">
              <b-button variant="danger" class="btn" @click="confirmDelete()">
                <i class="far fa-trash-alt"></i>
              </b-button>
              <b-button variant="success" class="btn" @click="refreshPage">
                <i class="fa fa-rotate-left"></i>
              </b-button>
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
          <div class="scratchContainer w-1/3" v-if="seenDeconnection">
            <div class="avatarContainer" v-on:click="urlPostAvatar()">
              <AvatarItem
                :avatar="storedUserAvatar"
                :altName="name"
              />
            </div>
            <!--Importation du Identification-->
            <UserIdentification
              :logout="logout"
              :isLoggedIn="isLoggedIn"
            />
            <div class="info">
              <!--Si le user est connecté et non-administrateur, l'icône de son compte s'afficher-->
              <button v-if="isLoggedIn" class="btn bg-info" @click="showAccount()"><i class="fas fa-user"></i> Votre compte</button><br><br>
            </div>
            <button v-on:click="btnScratchAction()" v-if="seenX" class="btnScratch-secend">X</button>
          </div>
        </div>
      </transition>
    </div> 
  </main>
</template>

<script>

import UserIdentification from "../components/UserIdentification";
import UserUrlData from "../service/UserUrlData";
import { mapGetters, mapState } from 'vuex';
import AvatarItem from "../components/AvatarItem.vue";

    
export default {
	name: "articles-list",
	components: { UserIdentification, AvatarItem },
  
	data() {
    return {
      loginCalled: false,
      accountAsked: false,
      email: "",
      name: "",
      confirmation: false,
      btnScratch: false,
      seenVoirPLus: true,
      seenDeconnection : true,
      seenX: true,
      seenAvoidDelBdn: true,
      ofContainerByAvatar: true,
    }
  },
	computed: {
    //Utilisation de Vuex pour déterminer les rôles et les autorisations du user (toutes ces informations étant conservées dans le store Vuex)
    ...mapGetters(['isLoggedIn']),
    ...mapState({ token: "token"}),
    ...mapState({storedUserAvatar: "storedUserAvatar"})
	},
	methods: {
    btnScratchAction(){
      if (this.btnScratch == true){
        this.btnScratch = false
        this.seenVoirPLus = true
      }
      else{
        this.btnScratch = true
        this.seenVoirPLus = false
      }
    },
    urlPostAvatar(){
      if(this.ofContainerByAvatar == true){
        this.ofContainerByAvatar = false;
        this.$router.push({ path: "/avatar" });
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
      this.accountAsked = true;
      this.seen = false;
      this.seenDeconnection = false;
      this.seenX = false
    },
    //Fonction de masquage des données du compte
    hideAccount() {
      this.accountAsked = false;
      this.seenDeconnection = true;
      this.seenX = true
    },

    // Fonction de récupération des données du user courant via une requête Axios GET
    showUser() {
     UserUrlData.getCurrentUser({Authorization: this.token})
      .then(response => {
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
        console.log(response.data.message);
        alert('Votre compte a bien été supprimé !');
        this.logout();
        this.refreshPage();
      })
      .catch(error => console.log(error));
    },
    //Fonction d'affichage le bouton de la confirmation(supprimer)
    confirmDelete() {
      this.confirmation = true;
      this.seenAvoidDelBdn = false
    },
    //Fonction de rafraîchissement de la page
    refreshPage() {
      this.hideAccount();
      this.seenAvoidDelBdn = true;
      this.confirmation = false;//je cache le bouton de confirmation(supprimer)
    },
	},
  //Déclenchement de la récupération des données du user au moment du rendu de la page 
  mounted() {
    this.showUser(this.token);
  },
}
</script>

<style>
/* Btn Scratch */

.btnScratchContainer{
  position: fixed;
  top: 16%;
  right: 5%;
  width: 200px;
  height: 150px;
  background-color: #bbaa13;
  padding: 1em;
  
}
.btnScratch{
  background-color: #0e6d11;
  padding: 5px 12px;
  font-size: 1em;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 10px;
}
.btnScratch:hover {background-color: #3e8e41}

.btnScratch:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.mainScratch{
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}
.accountAsked{
  background-color: rgb(245, 235, 235);
  padding: 1em;
  border-radius: 10px;
}
.scratchContainer{
  width: 25vw; 
  height: 15vh;
  align-items: center;
  justify-content: center;
}
.btnScratch-secend{
  position: relative;
  color: #fff;
  background-color: #3d5f3e;
  border: none;
  border-radius: 5px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* fin Btn scratch */

.avatarContainer img{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 1em;
  border: 2px solid black;
}
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
.container_form{
  padding-top: 130px;
  margin: auto;
}
body {
  background: linear-gradient(to top, #f0f3ee, #d1f3be);
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