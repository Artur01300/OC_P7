<!--Dans cette page on ajoute un nouvel article-->
<template>
    <main class="formArticle">

        <!--Importation du Identification-->
        <UserIdentification
            :isLoggedIn="isLoggedIn" 
        />

        <!-- <UserIdentification
            :logout="logout"
            :isLoggedIn="isLoggedIn" 
        /> -->
     
        <!--Utilisation de Vee-Validate : ValidationObserver pour suspendre la soumission du formulaire à l'existence d'une erreurs-->
            <ValidationObserver v-slot="{ invalid, handleSubmit }" v-if="!submitted">
                <!--handleSubmit empêche automatiquement la soumission native à tout moment(vérifie avant et prèt il envoie au backend-->  
                <form  v-if="isLoggedIn" class="container text-center form" @submit.prevent="handleSubmit(saveArticle)">
                <h2 v-if="isLoggedIn">Pour poster un nouvel article, merci de remplir les champs suivants :</h2><br>
                <div class="row">
                    <div class="articleModify col-12 col-md-6">
                        <div class="form-group">
                       
                            <!--Utilisation de Vee-Validate : ValidationProvider, pour tester la validité des données-->
                            <ValidationProvider name="article.title" rules="required"><!--Définition des règles de validité de l'input-->
                                <div slot-scope="{ errors }">
                                    <input 
                                       type="text" 
                                       class="form-control"
                                       required
                                       v-model="article.title"
                                       name="title"
                                       placeholder="Titre"
                                       aria-required="true" />
                                    <p class="error">{{ errors[0] }}</p><!--Une erreur s'affiche si l'input ne respecte pas les règles de ValidationProvider-->
                                </div>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <ValidationProvider name="article.content">
                                <textarea 
                                    type="textarea" 
                                    rows="5"
                                    cols="30"
                                    class="form-control"
                                    v-model="article.content"
                                    name="content"
                                    id="content"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <ValidationProvider name="article.image">
                                <!-- v-on écoute les évènements du DOM -->
                                <input type="file" class="btn-info" id="image" ref="image" v-on:change="handleFileUpload()" accept="image/*"/>
                            </ValidationProvider>
                        </div>
                        
                        <div>
                            <button class="btn btn-info" type="submit" value="Submit" v-bind:disabled="invalid">
                                <i class="fas fa-check"></i>
                                Poster
                            </button><br><br>

                            <router-link to="/articles" class="btn-info" aria-label="Lien vers la liste d'articles">
                                <button type= "button" class="btn btn-primary">
                                    <i class="fas fa-arrow-left"></i>
                                    Retour
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </form>
        </ValidationObserver>
        <div v-else>
            <h3>Votre article a bien été posté !</h3><br>
            <router-link to="/articles" aria-label="Lien vers la liste d'articles">
                <button type= "button" class="btn btn-primary">
                    Retour
                </button>
            </router-link><br><br>
        </div>
    </main>
</template>

<script>

import UserIdentification from "../components/UserIdentification"
import ArticlesUrlDada from "../service/ArticlesUrlDada"
import { mapGetters, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
    
export default {
    name: "PostArticle",
    components: {
        UserIdentification, ValidationProvider, ValidationObserver
	},
    data () {
        return {
            article: {
                title: "",
                content: "",
                image: "",
                size: ""
            },
            submitted: false,
            errors: []
        };
    },
     computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"})
    },
    methods: {
        handleFileUpload(){

            //Réstriction pour la taile de l'image: l'image ne doit pas dépassé le 1.2 Mo
            this.article.image = this.$refs.image.files[0];
            let imageSize = this.article.image.size;
            const MAX_HEIGHT = 1200000;

            if (imageSize > MAX_HEIGHT){
                alert('La taile de l\'image ne doit pas dépasser le 1.2 Mo !');
                this.$router.push({ path: "/articles/" });
            }
        },
        
        saveArticle(Authorization) {
            //La méthode append() de l'interface FormData ajoute une nouvelle valeur à une clé existante dans un objet FormData
            let formData = new FormData();
            formData.append('image', this.article.image);
            formData.append('title', this.article.title);
            formData.append('content', this.article.content);

            Authorization = this.token;
            ArticlesUrlDada.createArticle(formData, {Authorization})
            .then(response => {
                console.log(response.data.message);
                this.submitted = true;
            })
            .catch(error => console.log(error));
        },

        // Fonction de déconnection
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        }
    }
}
</script>

<style>


.formArticle{
    padding-top: 180px;
}
.articleModify{
    margin: auto;
}
</style>

