<!--Cette page permet de poster un nouveau commentaire -->

<template>
    <main class="main-comment">
        <div class="containerCenter text-center">

            <ValidationObserver v-slot="{ invalid, handleSubmit }">
                <form v-if="!submitted" @submit.prevent="handleSubmit(postCommentDetail)">
                    <div class="row">
                        <div role="form" class="col-12 col-md-9 text-center">
                        <h1>Commentez l'article sélectionné !</h1><br>
                            <div class="form-group">
        
                                <ValidationProvider name="comment.content" rules="required|minmax:3,500">
                                        <textarea
                                            type="textarea" 
                                            rows="5"
                                            cols="30"
                                            class="form-control"
                                            required
                                            v-model="comment.content"
                                            placeholder="Ajouter votre commentaire ici !"
                                            name="content"
                                            aria-label="Contenu du commentaire" 
                                        />
                                </ValidationProvider>
                            </div>
                            <div class="btn-comment">
                                <button class="btn btn-success btn-post" aria-label="Poster le commentaire" type="submit" value="Submit" v-bind:disabled="invalid">
                                    <i class="fas fa-check"></i> 
                                    Envoyez un commentaire
                                </button><br>

                                <router-link to="/articles" aria-label="Lien vers la liste d'articles">
                                    <button type= "button" class="btn btn-success"><i class="fas fa-times"></i>
                                        Annuler
                                    </button><br><br>
                                </router-link>

                                <router-link to="/articles/" aria-label="Lien vers la liste d'articles">
                                    <button type= "button" class="btn btn-primary">
                                        Retour
                                    </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </main>
</template>

<script>
import CommentsData from "../service/CommentsData"
import { mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
    
export default {
    name: 'PostComment',
    components: {
        ValidationProvider, ValidationObserver
    },
    data () {
        return {
            comment: {
                content: "",
                id_article: 0,
                created_at: ""
            },
            submitted: false
        }
    },
    computed: {
        ...mapState({ token: "token"}),
    },
    methods: {
        postCommentDetail(id_article, data, Authorization) {
            data = {
                content: this.comment.content
            };
            Authorization = this.token;
            id_article = this.$route.params.id_article;

            CommentsData.createComment(id_article, data, {Authorization})
            .then(response => {
                
                console.log(response.data);
                alert('Votre commentaire est bien posté !')
                this.$router.push({ path: '/ArticleDetails/'+id_article });
            })
            .catch(error => console.log(error));

        }
    }
}
</script>

<style>
    .main-comment{
        padding-top: 350px;
    }

    .containerCenter{
        max-width: 600px;
        margin: auto;
    }
    .btn-comment{
        display: flex;
        justify-content: space-around;
    }

    @media screen and (max-width : 600px) and (max-width : 1024px) {
        .containerCenter{
            max-width: 300px;

        }
        .main-comment{
            padding-top: 190px;
        }

        form h1{
            font-size: 1.6em;
        }

        .btn-comment .btn {
            width: 100px;
            margin: auto;
            font-size: 0.7em;
        }

        .btn-comment{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

    }
</style>