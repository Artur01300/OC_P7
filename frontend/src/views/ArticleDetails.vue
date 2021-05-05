<!-- Affiche les détails d'un article séléctionné avec ses commentaires qui permet les supprimer ou modifier-->

<template>
    <main>
        <div class="container home_container">
            <div id="header">
                <!-- s'affiche dans la page http://localhost:8080/articles/articleId124 -->
                <h1 v-if="isLoggedIn">Détails d'un article séléctionné</h1><br>
            </div>
            <div class="row">
                <div class="button-fix col-sm col-lg-2">
                    <router-link to="/articles" aria-label="Lien vers la liste d'article" v-if="isLoggedIn">
                        <button type= "button" class="btn btn-primary" id="arrow-only" aria-label="Lien vers la page d'accueil">
                            <i class="fas fa-arrow-left"></i>
                            Retour
                        </button><br><br>
                    </router-link>
                    
                    <div v-if="owner" class="action valid">
                        <!-- showUpdate: pour afficher le formulair de modification de l'article-->
                        <button type= "button" class="btn btn-primary" @click="showUpdate">
                            <i class="far fa-edit"></i>
                            Modifier
                        </button><br/><br>

                        <button type= "button" class="btn btn-primary btn-warning" @click="confirmDelete">
                            <i class="far fa-trash-alt"></i>
                            Supprimer
                        </button><br><br>

                        
                        <!--confirmation: pour afficher le bouton de cofirmation de suppression de l'article-->
                        <div v-if="confirmation">
                            <button type= "button" class="btn btn-danger" @click="deleteUserArticle">
                                Confirmer la suppression
                            </button><br><br>
                            <!--refreshPage: pour le bouton 'Annuler', une fois cliquer sur annuler le btn de confirmer la suppression est cacher-->
                            <button type= "button" class="btn btn-success cancel-btn" @click="refreshPage">
                                Annuler
                            </button><br><br>
                        </div>
                    </div>
                    <UserIdentification
                        :logout="logout"
                        :isLoggedIn="isLoggedIn"
                    />
                </div>

                <!-- si il y a des articles postés on affiche la carte pour les articles -->
                <div v-if="currentArticle[0]" class="container col-10 col-md-9">
                    <div class='row'>
                        <div class="col-12 col-lg-11">
                            <ArticlesItem 
                                :title="currentArticle[0].title"
                                :content="currentArticle[0].content"
                                :name="currentArticle[0].name"
                                :create_at="currentArticle[0].create_at"
                                :image="currentArticle[0].image"
                                :id_article="currentArticle[0].id_article"
                            /><br>
                        </div>
                        <!--Formulaire s'affiche quand le user clique sur le bouton "modifier"-->
                        <div v-if="askForUpdate" class="col-12 col-lg-10">
                            <div role="form" class="formUpdate">
                                <div>
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

                                    <button class="btn btn-success" @click="updateArticle" aria-label="Valider">
                                        Enregistrer vos modifications
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p v-if="messageUpdate" class="message_modify col-12 col-lg-10">
                            <strong>{{ messageUpdate }}</strong>
                        </p>

                        <h3 class="text_color col-12 col-lg-10">{{ messageComments }}</h3><br>
        
                        <!--Boucle sur le tableau des commentaires-->
                        <div class="col-12 col-lg-10 containterComment" v-for="comment in comments" :key="comment.created_at">
                            <ul>
                                <li>
                                    <CommentsItem
                                        :name="comment.name"
                                        :content="comment.content"
                                        :created_at="comment.created_at"
                                        :id_comment="comment.id_comment"
                                        :owner="comment.owner"
                                    />
                                </li>
                            </ul><br>
                        </div>
                    </div><br><br>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

import UserIdentification from "../components/UserIdentification"
import ArticlesItem from "../components/ArticlesItem"
import CommentsItem from "../components/CommentsItem"
import ArticlesUrlDada from "../service/ArticlesUrlDada"
import CommentsData from "../service/CommentsData"
import { mapGetters, mapState } from 'vuex'

export default {

    name: "ArticleDetails",
    components: {
        ArticlesItem, CommentsItem, UserIdentification
	},
    data() {
        return {
            currentArticle: [],
            comments: [],
            messageComments: "",
            owner: false,
            askForUpdate: "",
            confirmation: false,
            messageUpdate: ""
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"})
    },
    methods: {
        getOneArticle(id_article, Authorization) {
        Authorization = this.token;
        //Axios
        ArticlesUrlDada.getOneArticleFromUser(id_article, {Authorization})
            .then(response => {
                this.currentArticle = JSON.parse(JSON.stringify(response.data.data));
                this.owner = response.data.owner
            })
            .catch(error => console.log(error));
        },
        //pour afficher le formulair de modification de l'article
        showUpdate() {  
            return (this.askForUpdate = true);
        },
        //pour afficher le bouton de cofirmation de suppression de l'article
        confirmDelete() {
            return (this.confirmation = true);
        },
        //refreshPage: pour le bouton 'Annuler', une fois cliquer sur annuler le btn de confirmer la suppression est cacher
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
            //Axios
            ArticlesUrlDada.modifyTextArticle(this.$route.params.id_article, data, { Authorization }) 
                .then(response => {
                    console.log(response.data);
                    this.messageUpdate = "L'article modifié avec succès !";
                    this.askForUpdate = false;
                })
            .catch(error => console.log(error));
        },

        deleteUserArticle(Authorization) {
            Authorization = this.token;
            ArticlesUrlDada.delateArticle(this.currentArticle[0].id_article, { Authorization }) 
            .then(response => {
                console.log(response.data);
                // alert('Article supprimé');
                alert(this.messageComments = 'Article supprimé')
                this.$router.push({ path: "/articles" });
            })
            .catch(error => console.log(error));
        },
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        },
        
        getAllComments() {
        CommentsData.getAllComments(this.$route.params.id_article, {Authorization: this.token})
            
            .then(response => {
                this.comments = JSON.parse(JSON.stringify(response.data.responseData));

                //S'il n'y a aucun article disponible on affichage un message
                if (this.comments.length !== 0) {
                    this.messageComments = "Derniers commentaires postés"; 
                } else {
                    this.messageComments = "Il n'y a aucun commentaire pour le moment.";
                }
            })
            .catch(error => console.log(error));
        },       
    },

    beforeMount() {
        this.getOneArticle(this.$route.params.id_article, this.token);
        this.getAllComments();
    }
}
</script>


<style>

    .formUpdate{
        max-width: 550px;
        margin: auto;
        padding-bottom: 100px;
        padding-left: 100px;
    }
    #header{
        padding-top: 200px;
    }
    .jumbotron{
       background: rgba(0, 0, 0, 0.18);
    }

    .message_modify{
        font-size: 2em;
    }

    .button-fix{
    position: fixed;
    z-index: 1;
    }
    
    .text_color{
        color: white;
    }

    .containterComment{
        padding-top: 20px;
        margin-left: 35px;
    }

    @media screen and (max-width : 1000px) {
        .formUpdate{
            padding-left: 0px;
            max-width: 350px;
        }

        .message_modify{
            padding-left: 45px;
        }
        .containterComment{
        margin-left: 0px;
    }
    }

</style>