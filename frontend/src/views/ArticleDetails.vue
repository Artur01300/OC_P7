<!-- Affiche les détails d'un article séléctionné avec ses commentaires qui permest les supprimer ou modifier-->

<template>
    <main>
        <div class="container home_container">
            <div id="header">
                <!-- s'affiche dans la page http://localhost:8080/articles/articleId124 -->
                <router-link to="/articles" aria-label="Lien vers la liste d'article">
                    <button type= "button" class="btn btn-primary" id="arrow-only" aria-label="Lien vers la page d'accueil">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </router-link>
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
                    </div>
                </div>
                
                <!--Les boutons "suppression" et "modification" ne s'affiche que si le user est celui qui a posté l'article  ou s'il est administrateur-->
     
                <!--Affiche si le user n'est pas l'auteur de l'article ni l'administrateur-->
                <div v-else class="action invalid">
                    <router-link to="/articles" aria-label="Lien vers la liste d'article"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                    <router-view />
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
            })
            .catch(error => console.log(error));
        },

         refreshPage() {
          this.getOneArticle(this.$route.params.id_article);
          this.confirmation = false;
        },

        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        }
       
    },    
    beforeMount() {
        this.getOneArticle(this.$route.params.id_article, this.token);
    }
}
</script>


<style>
    #header{
        padding-top: 150px;
    }
    .jumbotron{
  
       background: rgba(0, 0, 0, 0.18);
    }

</style>