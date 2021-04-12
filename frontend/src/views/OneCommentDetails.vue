<template>
   <main class="conteiner_comment">
        <div class="container">
            <div class="row">
                <div class="container col-12 col-md-10">
                    <div class='row'>
                        <div v-if="!deleted" div class="col-12 col-md-9 comment__box">
                            <CommentsItem
                                :name="currentComment.name"
                                :content="currentComment.content"
                                :created_at="currentComment.created_at"
                            />
                        </div>

                        <div class="comment_btn">
                            <!--La section des boutons "delet" s'affiche que si le user est celui qui a posté le commentaire-->
                            <div v-if="owner && !deleted">
                                <button @click="deleteOneComent" type= "button" class="btn btn-danger">
                                    <i class="far fa-trash-alt">Supprimer</i>
                                </button><br><br>
                            </div>

                            <div>
                                <router-link to="/articles/" aria-label="Lien vers la liste d'articles">
                                    <button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> 
                                        Retour
                                    </button>
                                </router-link>
                                <router-view /><br><br>
                                <UserIdentification
                                    :logout="logout"
                                    :isLoggedIn="isLoggedIn"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import UserIdentification from "../components/UserIdentification"
import CommentsItem from "../components/CommentsItem"
import CommentsData from "../service/CommentsData"
import { mapGetters, mapState } from 'vuex'
    
export default {
    name: "OneCommentDetails",
    components: {
        CommentsItem, UserIdentification
    },
    data () {
        return {
            deleted: null,
            currentComment: {
                content: "",
                name: "",
                created_at: "",
                id_comment: "",
                articles_id_article: ""
            },
            alreadyCommented: false,
            owner: false,
            updateIsAsked: false,
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"})
     },
    methods: {

       getOneComment(Authorization) {
            Authorization = this.token;
           //requête GET
            CommentsData.getOneCommentFromUser(this.$route.params.id_comment, { Authorization })
            .then(response => {
                this.currentComment = JSON.parse(JSON.stringify(response.data.responseData[0]));
                this.owner = response.data.owner
            })
            .catch(error => console.log(error));
        },
        
        deleteOneComent(Authorization) {
            Authorization = this.token;
            CommentsData.deleteComment(this.$route.params.id_comment, { Authorization })
            .then(response => {
                console.log(response.data);
                this.deleted = true;
                alert('Comment supprimé !')
                this.$router.push({ path: '/ArticleDetails/'+this.currentComment.articles_id_article}); 
               
            })
            .catch(error => console.log(error));
        },
        //Fonction de déconnexion
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        }
    }, 
    //récupération des données
    beforeMount() {
        this.getOneComment();
    }
}
</script>

<style>
    .conteiner_comment{
        padding-top: 350px;
    }
    .comment_btn{
        padding-top: 20px;
    }
</style>