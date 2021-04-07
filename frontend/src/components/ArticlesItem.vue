<!--
    cet component affiche tous les articles postés par users .
    il est utilisé dans la page Articles.vue et ArticleDitails.vue
-->

<template>
    <div class="home_container">
        <!--Section affiche la liste complète des articles-->
        <div v-if="this.$route.name == 'articles-list'" class="card text-center">
            <div class="card-bod">
               
                <p class="name">Article posté  par {{name}}, le : {{ new Date(create_at).toLocaleDateString()}}</p>
                <h3 class="card-title">{{ title }}</h3>
                <p class="card-subtitle">{{ content }}</p><br>
                <img v-if="image" v-bind:src="'http://localhost:3000/images/' + image" width="600" height="400" alt=" Image sur l'article"><br><br>
    
            </div>
            <!-- href="'/articles/articleId' associer avec index.js:  path: '/articles/articleId:id' -->
            <a class="btn btn-secondary" :href="'/ArticleDetails/' + id_article"><i class="fas fa-info-circle"></i> Cliquez : Voire en détaille sur cet article</a>
        </div>
        <!--Section affiche un article en particulier-->
         <div v-else class="card text-center">
            <div class="card-header">
                <ul class="list-group">
                    <li class="list-group-ite">
                        <!-- permet de voir les liste de commentaire d'un article -->
                        <a :href="'/ArticleDetails/' + id_article + '/comment/'"><i class="far fa-edit"></i> Envoyez un commentaire</a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <p>Article posté le : {{ new Date(create_at).toLocaleDateString() }}</p>
                <h2 class="card-title">{{ title }}</h2>
                <p class="card-text">{{ content }}</p>
                <img v-if="image" v-bind:src="'http://localhost:3000/images/' + image" width="600" height="400" alt=" Image sur l'article">
            </div>
        </div>
    </div>
</template>


<script>

export default {
	name: "ArticlesItem",
	props: {
        
		title: {
			type: String,
			required: true
		},
        content: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: null
		},
		create_at: {
			type: String,
			required: true
		},
        id_article:{
            type: Number, 
            required: true
        },
        image:{
            type: String,
            required: null
        }
	},
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
        }
    }
}
</script>

<style scoped>
    .name{
        color: gold;
        font-size: 1.5em;
        padding-top: 20px;
    }
</style>