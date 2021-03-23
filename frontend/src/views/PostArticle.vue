<!--PAGE D'AJOUT D'UN NOUVEL ARTICLE-->

<template>
    <main class="jumbotron"> 
        <h1 v-if="!submitted">Vous souhaitez partager vos intérêts avec votre communauté ? C'est ici !</h1>
        <!--Utilisation de Vee-Validate : ValidationObserver pour suspendre la soumission du formulaire à l'existence ou non d'erreurs-->
            <ValidationObserver v-slot="{ invalid, handleSubmit }" v-if="!submitted" >    
                <form class="container text-center form formArticle" @submit.prevent="handleSubmit(saveArticle)">
                <h2>Pour poster un nouvel article, merci de remplir les champs suivants :</h2>
                <div class="row">
                    <div class="formArticle__box col-12 col-md-9">
                        <div class="form-group">
                            <label for="title">Titre</label>
                            <!--Utilisation de Vee-Validate : ValidationProvider, pour tester la validité des données-->
                            <ValidationProvider name="article.title" rules="required|minmax:3,100"><!--Définition des règles de validité de l'input-->
                                <div slot-scope="{ errors }">
                                    <input 
                                       type="text" 
                                       class="form-control"
                                       required
                                       v-model="article.title"
                                       name="title"
                                       aria-required="true" />
                                    <p class="error">{{ errors[0] }}</p><!--Une erreur s'affiche si l'input ne respecte pas les règles de ValidationProvider-->
                                </div>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <label for="content">Description</label>
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
                        <!-- <div class="form-group">
                            <label for="image">image</label>
                            <ValidationProvider name="article.image" rules="minmax:11,200">
                                <div slot-scope="{ errors }">
                                    <input 
                                       type="text" 
                                       class="form-control"
                                       v-model="article.image"
                                       name="image" 
                                    />
                                    <p class="error">{{ errors[0] }}</p>
                                </div>
                            </ValidationProvider>
                        </div> -->

                        <div class="form-group">
                            <label for="image">image</label>
                            <ValidationProvider name="article.image" rules="minmax:11,200">
                                <div slot-scope="{ errors }">
                                    <!-- <input type="text" class="form-control" v-model="article.image" name="image" /> -->
                                    <!-- <input type="file" name="image" id="image" /> -->

                                    <input type="file" id="image" ref="image" v-on:change="handleFileUpload()"/>
                                    <p class="error">{{ errors[0] }}</p>
                                </div>
                            </ValidationProvider>
                        </div>
                        
                        <div class="post-btns">
                            <button class="btn btn-success" type="submit" value="Submit" v-bind:disabled="invalid"><i class="fas fa-check"></i> Valider ce post</button>
                            <router-link to="/articles" class="btn-return" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                            <router-view />
                        </div>
                    </div>
                </div>
            </form>
        </ValidationObserver>
        <div v-else id="afterMessage">
            <h3>Votre article a bien été posté sur la plateforme !</h3>
            <router-link to="/articles" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary">Retour à la liste</button></router-link>
            <router-view />
        </div>
        
        <!--Importation du component Identification-->
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
            },
            submitted: false,
            errors: []
        };
    },
     computed: {
         //Utilisation de Vuex pour déterminer les rôles et les autorisations du user (toutes ces informations étant conservées dans le store Vuex)
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"}),
        ...mapState({ id_user: "id_user"})
    },
    methods: {
        
        handleFileUpload(){
            this.article.image = this.$refs.image.files[0];
            console.log(this.article.image.name)
        },
        
        saveArticle(Authorization) {
            let formData = new FormData();
            formData.append('image', this.article.image);
            formData.append('title', this.article.title);
            formData.append('content', this.article.content);
            formData.append('users_id_user', this.id_user);

   
            Authorization = `Bearer ${this.token}`;

           // Requête Axios POST
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