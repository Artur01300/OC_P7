<!-- pAGE d'accuil de forum (qui liste les article postées) -->

<template>
    <main>
        <div class="articles container_form">

            <div class="articles_containter">
                <router-link to="/articles/creat" aria-label="Poster un nouvel article">
                    <button  type= "button" class="btn btn-primary btn-add">
                        <i class="far fa-plus-square"></i>
                            Poster un nouvel article
                        </button>
                </router-link>
            </div>
            
            <div>
                <div class="container">
                    <div class='row articles__box'>
                        <ul class="col-12 col-lg-12">
                           <h1>Plateforme de partage d'articles</h1><br><br>
                            <!--Boucle sur le tableau des articles filtrés-->
                                <!-- <li v-for="article in filteredArticles" :key="article.name"> -->
                            <li v-for="article in filteredArticles" :key="article.title">
                                <!--Importation du component ArticlesItem-->
                                <ArticlesItem 
                                :id_user="article.id_user"
                                :title="article.title"
                                :content="article.content"
                                :image ="article.image"
                                :name="article.name"
                                :create_at="article.create_at" 
                                :id_article="article.id_article"
                                />
                                
                            </li>
                        </ul>
                    </div>
                </div>
                <p v-if="articles.length == 0">{{ message }}</p>
            </div>
            <!--Importation du CallToLogin -->
            <CallToLogin v-if="!isLoggedIn" />

                <!--Importation du Identification-->
            <UserIdentification
                :logout="logout"
                :isLoggedIn="isLoggedIn"
            />
            
        </div> 
    </main>
</template>

<script>

import UserIdentification from "../components/UserIdentification"
import CallToLogin from "../components/CallToLogin"
import ArticlesItem from "../components/ArticlesItem"

import ArticlesUrlDada from "../service/ArticlesUrlDada"
import { mapGetters, mapState } from 'vuex'
        
export default {
    name: "Articles",
    components: {
        ArticlesItem, CallToLogin, UserIdentification, 
	},
    data () {
        return {
            articles:[],
            activeArticle: null,
            message: "Il n'y a aucun article posté sur la plateforme à ce jour.",
            search:""
        }
    },
   computed: {
       //Utilisation de Vuex
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"}),
       //filtrage des articles par sujet
        filteredArticles() {
            return this.articles.filter(article => {
            return article.title.includes(this.search);
            })
        }
    },
    methods: {
        
  
        getAll() {
            //requête GET par Axios
            ArticlesUrlDada.getAllArticles({ Authorization: this.token})
            .then(response => {
            this.articles = JSON.parse(JSON.stringify(response.data.data));
            })
            .catch(error => console.log(error));
        },
        //Fonction de déconnexion;
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        }
    },
    //Déclenchement de la récupération d'articles avant le rendu de la page 
    beforeMount() {
        this.getAll();
    }
};
    
</script>

<style>


    li{
        list-style:none;
    }

    .articles_containter{
        position: fixed;
        z-index: 1;
    }
</style>