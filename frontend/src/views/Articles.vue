<!--PAGE D'ACCUEIL DU FORUM ARTICLES PRESENTANT LA LISTE COMPLETE DES ARTICLES-->

<template>
    <main>
        <div class="articles">
            <h1>Plateforme de partage d'articles</h1>
            <div>
                <h2>Derniers articles postés</h2>
                    <div>
                        <!-- <label>Recherche par thème : </label>
                         <select name="name" v-model="search">
                            <option value="">-- Liste complète --</option>
                        </select> -->
                    </div>
                    <div class="container">
                        <div class='row articles__box'>
                            <ul class="col-12 col-lg-9">
                                <!--Boucle sur le tableau des articles filtrés-->
                                <li v-for="article in filteredArticles" :key="article.name">
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
                            <div class="col-12 col-lg-3">
                                 <!-- attribut est utilisé pour définir une chaîne qui étiquette l'élément actuel.
                                    Utilisez-le dans les cas où une étiquette de texte n'est pas visible à l'écran.  
                                -->
                                <router-link to="/articles/" aria-label="Poster un nouvel article"><button  type= "button" class="btn btn-primary btn-add"><i class="far fa-plus-square"></i> Poster un nouvel article</button></router-link>
                            </div> 
                        </div>
                    </div>
                <p v-if="articles.length == 0">{{ message }}</p>
            </div>
            <!--Importation du component -->
            <CallToLogin v-if="!isLoggedIn" />
            <!--Importation du component UserIdentification-->
            <UserIdentification
                :logout="logout"
                :isLoggedIn="isLoggedIn"
                />
        </div> 
        <!--Importation du component Footer-->
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
       //Utilisation de Vuex pour déterminer les rôles et les autorisations du user (toutes ces informations étant conservées dans le store Vuex)
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"}),
       //Fontion de filtrage des articles par sujet
        filteredArticles() {
            return this.articles.filter(article => {
            return article.name.includes(this.search);
            })
        }
    },
    methods: {
  
        getAll() {
            //Fonction qui lance la requête GET via Axios
            ArticlesUrlDada.getAllArticles({ Authorization: `Bearer ${this.token}`})
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
    //Déclenchement de la récupération de la liste d'articles avant le rendu de la page 
    beforeMount() {
        this.getAll();
    }
};
    
</script>

<style>
    li{
        list-style:none;
    }
</style>