<!-- page d'accuil de forum -->

<template>
    <main class="main">
        <div v-if="isLoggedIn" class="container">
            <div class="articles_containter">
                <router-link to="/articles/creat" aria-label="Poster un nouvel article" class="btn_marge">
                    <button v-if="isLoggedIn" type= "button" class="btn btn-info btn-add">
                        <i class="far fa-plus-square"></i>
                        <span>
                            Poster un nouvel article
                        </span>
                    </button>
                </router-link>
            </div>
            <div v-if="isLoggedIn">
                <div class="container">
                    
                    <div class='row marge_container'>
                        <ul class="col-12 col-lg-12">
                           <!-- attribut unique key(article.id_user) ajouté pour suivre l'identité de chaque entrecroisement,
                                afin que les éléments puissent être réutilisés 
                            -->
                            <li v-for="article in articles" :key="article.id_user">
                                <!--Importation du ArticlesItem-->
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
        </div> 
        <div v-if="!isLoggedIn">
            <Login />
        </div>
    </main>
</template>

<script>

import ArticlesItem from "../components/ArticlesItem";
import ArticlesUrlDada from "../service/ArticlesUrlDada";
import { mapGetters, mapState } from 'vuex';
import Login from "../components/UsersLogin.vue";
        
export default {
    name: "articles-list",
    components: {
        ArticlesItem, Login
	},
    data () {//j'effectue des calcules et je retourne les résultat
        return {
            // loginCalled: false,
            articles:[],
            message: "Il n'y a aucun article posté sur la plateforme à ce jour."
        }
    },
   computed: {//j'ai défini des valeurs réutilisables qu'ils sont liés avec propirété data
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"}),
    },
    methods: {//ici je définie mes fonction pour afficher tous mes article postés
        getAll() {
            //requête GET par Axios
            ArticlesUrlDada.getAllArticles({Authorization: this.token})
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
    /*
        Le hook beforeMount s'exécute juste avant l’apparition des articles sur la page.
        c'est à dir, je récupère les données depuis serveur et après j'affiche les résultats dans le forntand de manière asynchrone
    */
    beforeMount(){
        this.getAll();
    }
};
    
</script>

<style>
 
    li{
        list-style: none;
    }

    /* .marge_container h1{
        padding-top: 40px;
        font-size: 2em;
        font-weight: bolder;
        color: #17a2b8;;
    } */

    .articles_containter{
        padding-top: 20px;
        position: fixed;
        z-index: 1;
        display: flex;
        border-radius: 40px;
    }

    .form button{
        background-color: #138496;
    }
    .form button:hover, .form button:active, .form button:focus {
        background: #17a2b8;
    }

    /* .containerModify{
        padding-top: 10em;
        max-width: 400px;
        background-color: white;
    } */
    .btn_marge{
        padding-right: 1em;
    }

    .marge_container{
        padding-top: 5em;
    }

    /* .containerModify{
        background-color: #17a2b8;
    } */

    @media screen and (max-width : 600px) and (max-width : 1024px) {
       
        .articles_containter{
            width: 10%;
            margin: auto;
        }
        .articles_containter span{
            font-size: 0.8em;
        }
        .articles_containter button{
            width: 100px;
            font-size: 0.6em;
        }

        .marge_container h1{
            padding-top: 40px;
            font-size: 1.9em;
        }

    }
</style>