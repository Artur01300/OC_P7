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
                            <ArticlesItem 
                                :title="currentArticle[0].title"
                                :content="currentArticle[0].content"
                                :name="currentArticle[0].name"
                                :create_at="currentArticle[0].create_at"
                                :image="currentArticle[0].image"
                                :id_article="currentArticle[0].id_article"
                                :users_id_user="currentArticle[0].users_id_user"
                            /><br>

                            <h3>{{ messageComments }}</h3><br>
                        
                            <!--Boucle sur le tableau des commentaires-->
                            <div v-for="comment in comments" :key="comment.created_at">
                                <ul>
                                    <li>
                                        <CommentsItem
                                            :name="comment.name"
                                            :content="comment.content"
                                            :created_at="comment.created_at"
                                        />
                                    </li>
                                </ul><br>
                            </div>
                        </div>
                    </div> <br>

                    <p v-if="messageUpdate" class="message_modify">
                        <strong>{{ messageUpdate }}</strong>
                    </p>

                    <p v-if="confirmation" class="message_modify">
                        Etes-vous sûr de supprimer ce article ?
                    </p>

                    <router-link to="/articles" aria-label="Lien vers la liste d'article">
                        <button type= "button" class="btn btn-primary" id="arrow-only" aria-label="Lien vers la page d'accueil">
                            <i class="fas fa-arrow-left"></i> Retour à la liste
                        </button>
                    </router-link>
                </div>
                <div v-if="owner" class="col-12 col-md-2 action valid">
                    <button type= "button" class="btn btn-primary " @click="showUpdate"><i class="far fa-edit"></i> Modifier</button><br/><br>
                    <button type= "button" class="btn btn-primary btn-warning " @click="confirmDelete"><i class="far fa-trash-alt"></i> Supprimer</button><br><br>
                    <!--s'affiche quand le user clique sur le bouton "suppression"-->
                    <div v-if="confirmation">
                        <button type= "button" class="btn btn-danger" @click="deleteUserArticle">Supprimer</button><br><br>
                        <button type= "button" class="btn btn-success cancel-btn" @click="refreshPage">Annuler</button><br><br>
                    </div>
                </div>
              
            </div>

             <!--Formulaire s'affiche quand le user clique sur le bouton "modifier"-->
            <div v-if="askForUpdate">
               <div role="form" class="container text-center formUpdate">
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
import CommentsItem from "../components/CommentsItem"
import ArticlesUrlDada from "../service/ArticlesUrlDada"
import CommentsData from "../service/CommentsData"
import { mapGetters, mapState } from 'vuex'

export default {

    name: "ArticleDetails",
    components: {
        ArticlesItem, CommentsItem, UserIdentification
	},
    data () {
        return {
            currentArticle: [],
            comments: [],
            messageComments: "",
            owner: false,
            askForUpdate: "",
            confirmation: false,
            messageUpdate: "",

        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"})
    },
    methods: {
        getOneArticle(id_article, Authorization) {

            Authorization = this.token;
           
            ArticlesUrlDada.getOneArticleFromUser(id_article, {Authorization})
            .then(response => {
                this.currentArticle = JSON.parse(JSON.stringify(response.data.data));
                localStorage.setItem("article_id", this.currentArticle[0].id_article);
                this.owner = response.data.owner
        
            })
            .catch(error => console.log(error));
        },

         showUpdate() {  
            return (this.askForUpdate = true);
        },

         confirmDelete() {
            return (this.confirmation = true);
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
            ArticlesUrlDada.modifyTextArticle(this.$route.params.id_article, data, { Authorization }) 
                .then(response => {
                    console.log('response')
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

        CommentsData.getAll(this.$route.params.id_article, {Authorization: this.token})
            
            .then(response => {
                this.comments = JSON.parse(JSON.stringify(response.data.data));

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
        this.askForUpdate = false;
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

    .message_modify{
        font-size: 2em;
    }

</style>