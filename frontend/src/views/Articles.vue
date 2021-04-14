<!-- page d'accuil de forum -->

<template>
    <main class="main">
        <div class="container containerModify form">

            <div class="articles_containter">
                <router-link to="/articles/creat" aria-label="Poster un nouvel article" class="btn_marge">
                    <button type= "button" class="btn btn-info btn-add">
                        <i class="far fa-plus-square"></i>
                        <span>
                            Poster un nouvel article
                        </span>
                    </button>
                </router-link>

                <CallToLogin v-if="!isLoggedIn" />

                <!--Si on est connecté on affiche le bouton de déconéxion si non on affiche le bouton de login-->
                <UserIdentification
                    :logout="logout"
                    :isLoggedIn="isLoggedIn"
                />

            </div>
            
            <div>
                <div class="container">
                    <div class='row marge_container'>
                        <ul class="col-12 col-lg-12">
                           <h1>Plateforme de partage d'articles</h1><br><br>
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
            message: "Il n'y a aucun article posté sur la plateforme à ce jour."
        }
    },
   computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"}),
    },
    methods: {
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
    //Déclenchement de la récupération d'articles avant le rendu de la page 
    beforeMount() {
        this.getAll();
    }
};
    
</script>

<style>
    .main{
        max-width: 800px;
        margin: auto
    }
    li{
        list-style: none;
    }

    .marge_container h1{
        padding-top: 40px;
        font-size: 2em;
        font-weight: bolder;
        color: #17a2b8;;
    }

    .articles_containter{
        padding-top: 20px;
        position: fixed;
        z-index: 1;
        display: flex;
    }

    .form button{
        background-color: #138496;
    }
    .form button:hover, .form button:active, .form button:focus {
        background: #17a2b8;
    }

    .containerModify{
        padding-top: 10em;
        max-width: 400px;
        background-color: white;
    }
    .btn_marge{
        padding-right: 1em;
    }

    .marge_container{
        padding-top: 5em;
    }

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