<!-- Affiche les détails d'un article séléctionné avec ses commentaires qui permest les supprimer ou modifier-->

<template>
    <main>
        <div class="container home_container">
            <div id="header">
                <!-- s'affiche dans la page http://localhost:8080/articles/articleId124 -->
                <h1>Metre un tire</h1>
            </div>
            <div class="row">
                <div v-if="currentArticle[0]" class="container col-12 col-md-10">
                    <div class='row'>
                        <div class="col-12 col-lg-11 article-item">
                            <!--Importation du ArticlesItem-->
                            <ArticlesItem 
                                :title="currentArticle[0].title"
                                :content="currentArticle[0].content"
                                :name="currentArticle[0].name"
                                :create_at="currentArticle[0].create_at"
                                :image="currentArticle[0].image"
                                :id_article="currentArticle[0].id_article"
                            />
                        </div>
                    </div> <br>

                    <router-link to="/articles" aria-label="Lien vers la liste d'article">
                        <button type= "button" class="btn btn-primary" id="arrow-only" aria-label="Lien vers la page d'accueil">
                            <i class="fas fa-arrow-left"></i> Home
                        </button>
                    </router-link>
                </div>

                  <!--La section suivante des boutons "suppression" et "modification" ne s'affiche que si le user est celui qui a posté l'article' à l'origine ou s'il est administrateur-->
                <div v-if="validUser" class="col-12 col-md-2 action valid">
                    <button type= "button" class="btn btn-primary action__btn" @click="showUpdate"><i class="far fa-edit"></i> Modifier</button><br/>
                    <p class="text">{{ messageUpdate }}</p>
                    <!-- <button type= "button" class="btn btn-primary btn-suppress action__btn" @click="confirmDelete"><i class="far fa-trash-alt"></i> Supprimer</button> -->
                    <!--Message qui ne s'affiche que quand le user clique sur le bouton "suppression"-->
                    <div v-if="confirmation" class="confirmation">
                        <p class="text">Etes-vous sûr de vouloir supprimer ce post ?</p>
                        <button type= "button" class="btn btn-primary" @click="deleteArticle">Supprimer</button>
                        <button type= "button" class="btn btn-primary cancel-btn" @click="refreshPage">Annuler</button>
                    </div>
                    <router-link to="/articles" class="valid__return" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                    <router-view />
                </div>

                
                <!--Les boutons "suppression" et "modification" ne s'affiche que si le user est celui qui a posté l'article  ou s'il est administrateur-->
     
                <!--Affiche si le user n'est pas l'auteur de l'article ni l'administrateur-->
                <div v-else class="action invalid">
                    <router-link to="/articles" aria-label="Lien vers la liste d'article"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                    <router-view />
                </div>
            </div>

             <!--Formulaire qui ne s'affiche que quand le user clique sur le bouton "modifier"-->
            <div v-if="askForUpdate">
               <div role="form" class="container text-center formUpdate">
                    <h2 >Pour modifier cet article, merci de remplir les champs suivants :</h2>
                    <div class="row">
                        <div class="col-12 col-md-9 text-center">
                            <div class="form-group">
                                <label for="title">Titre</label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    required
                                    v-model="currentArticle[0].title"
                                    name="title" 
                                />
                            </div>

                            <div class="form-group">
                                <label for="content">Description</label>
                                <textarea 
                                    type="textarea" 
                                    rows="5"
                                    cols="30"
                                    class="form-control"
                                    v-model="currentArticle[0].content"
                                    name="content"
                                    id="content"
                                />
                            </div>

                            <button class="btn btn-success" @click="updateArticle" aria-label="Valider">Enregistrer vos modifications</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--Importation UserIdentification-->
            <UserIdentification
                :logout="logout"
                :isLoggedIn="isLoggedIn" 
            />
        </div>
    </main>
</template>

<script>

import UserIdentification from "../components/UserIdentification"
import ArticlesItem from "../components/ArticlesItem"
import ArticlesUrlDada from "../service/ArticlesUrlDada"
import { mapGetters, mapState } from 'vuex'

export default {

    name: "ArticleDetails",
    components: {
        ArticlesItem, UserIdentification
	},
    data () {
        return {
            currentArticle: [],
            comments: [],
            messageComments: "",
            validUser: false,
            askForUpdate: "",
            confirmation: false,
            messageUpdate: "",

        }
    },
    computed: {
       //Utilisation de Vuex pour déterminer les rôles et les autorisations du user (toutes ces informations étant conservées dans le store Vuex)
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"})
    },
    methods: {
        getOneArticle(id_article, Authorization) {

            Authorization = this.token;
            ArticlesUrlDada.getOneArticleFromUser(id_article, {Authorization})
            .then(response => {
                this.currentArticle = JSON.parse(JSON.stringify(response.data.data));

            localStorage.setItem("Article_Id", this.currentArticle[0].id_article);

                if (this.currentArticle[0].user_id !== this.userId) { //????
                    this.validUser = false;  
                } else {
                    this.validUser = true;
                }
            })
            .catch(error => console.log(error));
        },

         showUpdate() {  
            return (this.askForUpdate = true);
        },

         refreshPage() {
          this.getOneArticle(this.$route.params.id_article);
          this.confirmation = false;
        },

        updateArticle(data, Authorization) {
            data = {
                title: this.currentArticle[0].title,
                content: this.currentArticle[0].content,
            };
            Authorization = this.token;
            //Fonction qui déclenche la requête PUT via Axios
            ArticlesUrlDada.modifyTextArticle(this.$route.params.id_article, data, { Authorization }) 
                .then(response => {
                    console.log('response')
                    console.log(response.data);
                    this.messageUpdate = "Cet article a été modifié avec succès.";
                    this.askForUpdate = false;
                })
            .catch(error => console.log(error));
        }, 

        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        }
       
    },    
    beforeMount() {
        this.getOneArticle(this.$route.params.id_article, this.token);
        this.askForUpdate = false;
        this.validUser = false;
    }
}
</script>


<style>
    #header{
        padding-top: 200px;
    }
    .jumbotron{
  
       background: rgba(0, 0, 0, 0.18);
    }

</style>