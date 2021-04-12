<!--PAGE D'AJOUT D'UN NOUVEL ARTICLE-->

<template>
    <main class="formArticle">
        <!--Utilisation de Vee-Validate : ValidationObserver pour suspendre la soumission du formulaire à l'existence ou non d'erreurs-->
            <ValidationObserver v-slot="{ invalid, handleSubmit }" v-if="!submitted" >    
                <form class="container text-center form" @submit.prevent="handleSubmit(saveArticle)">
                <h2>Pour poster un nouvel article, merci de remplir les champs suivants :</h2><br>
                <div class="row">
                    <div class="col-10 col-md-12">
                        <div class="form-group">
                       
                            <!--Utilisation de Vee-Validate : ValidationProvider, pour tester la validité des données-->
                            <ValidationProvider name="article.title" rules="required|minmax:3,2000"><!--Définition des règles de validité de l'input-->
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
                            <ValidationProvider name="article.content" rules="minmax:3,2000">
                                <div slot-scope="{ errors }">
                                    <textarea 
                                        type="textarea" 
                                        rows="5"
                                        cols="30"
                                        class="form-control"
                                        v-model="article.content"
                                        name="content"
                                        id="content"/>
                                    <p class="error">{{ errors[0] }}</p>
                                </div>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <ValidationProvider name="article.image"  rules="minmax:11,200">
                                <div slot-scope="{ errors }">
                                    <!-- v-on écoute les évènements du DOM -->
                                    <input type="file" class="btn-info" id="image" ref="image" v-on:change="handleFileUpload()" accept="image/*"/>
                                    <p class="error">{{ errors[0] }}</p>
                                </div>
                            </ValidationProvider>
                        </div>
                        
                        <div class="post-btns">
                            <button class="btn btn-info" type="submit" value="Submit" v-bind:disabled="invalid"><i class="fas fa-check"></i> Valider ce post</button><br><br>
                            <router-link to="/articles" class="btn-info" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour</button></router-link>
                            <router-view />
                        </div>
                    </div>
                </div>
            </form>
        </ValidationObserver>
        <div v-else id="afterMessage">
            <h3>Votre article a bien été posté !</h3><br>
            <router-link to="/articles" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary">Retour</button></router-link><br><br>
            <router-view />
        </div>
        
        <!--Importation du Identification-->
        <UserIdentification
            :logout="logout"
            :isLoggedIn="isLoggedIn" 
        />
           
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
         //Utilisation de Vuex pour déterminer les rôles et les autorisations du user (toutes ces informations étant conservées dans le store Vuex)
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
                alert('La taile de l\'image ne doit pas dépassé le 1.2 Mo !');
                this.$router.push({ path: "/articles/" });
            }
        },
        
        saveArticle(Authorization) {
            //La méthode append() de l'interface FormData ajoute une nouvelle valeur à une clé existante dans un objet FormData
            let formData = new FormData();
            formData.append('image', this.article.image);
            formData.append('title', this.article.title);
            formData.append('content', this.article.content);
            // formData.append('users_id_user', this.token);

            Authorization = this.token;
            ArticlesUrlDada.createArticle(formData, {Authorization})
            .then(response => {
                console.log(response);
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
    padding-top: 250px;
}

</style>

