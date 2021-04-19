<!--
    cet component affiche tous les articles postés par users .
    il est utilisé dans la page Articles.vue et ArticleDitails.vue
-->

<template>
    <div class="home_container">
        <!--Section affiche la liste complète des articles-->
        <div v-if="this.$route.name == 'articles-list'" class="card text-center">
            <div class="card-body">
               <i class="fas fa-cash-register fa-3x"></i>
                <span class="name">Article posté  par : {{name}}</span><br>
                <span> Le : {{new Date(create_at).toLocaleDateString()}}</span>
                <h3 class="card-title name">Titre : {{ title }}</h3><br>
                
                <p class="card-subtitle border border-warning">Déscrpitpon : {{ content }}</p><br>
                <!-- v-bind génère l'url dynamiquement -->
                <img v-if="image" v-bind:src="'http://localhost:3000/images/' + image" class="img-fluid" width="600" height="400" alt=" Image sur l'article">
    
            </div>
            <!-- href="'/articles/articleId' associer avec index.js:  path: '/articles/articleId:id' -->
            <a class="btn btn-info col-12 col-lg-12" :href="'/ArticleDetails/' + id_article">
                <i class="fas fa-hand-point-up"></i>
                Cliquez : Voire en détaille sur cet article
            </a><br>
        </div>
        <!--Section affiche un article en particulier-->
         <div v-else class="card text-center">
            <div class="card-header">
                <ul class="list-group">
                    <li>
                        <!-- permet de voir les liste de commentaire d'un article -->
                        <a :href="'/ArticleDetails/' + id_article + '/comment/'">
                           <span>Envoyez un commentaire</span>
                           <i class="fas fa-comment fa-3x"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body card-body_text">
                <p>Article posté le : {{new Date(create_at).toLocaleDateString()}}</p>
                <h2 class="card-title">{{title}}</h2>
                <p class="card-text">{{content}}</p>
                <img v-if="image" v-bind:src="'http://localhost:3000/images/' + image" class="img-fluid" width="600" height="400" alt=" Image sur l'article">
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

    .home_container{
        background: rgba(0, 0, 0, 0.1);
    }
    .name{
        color: black;
        font-size: 1.5em;
        padding-top: 20px;
    }

    .card{
        /* background-color: #11ffee00; */
        background-color: white;
        color:black;
        
    }
    .card p{
        font-size: 1.6em;
    }

    .btn-info{
        width: 330px;
        text-align: center;
        margin: auto;
    }
    .border{
        background-color: white;
        color: black;
    }

  .list-group span{
    color: #273746 ;
    font-size: 2em;
    padding-right: 10px;
  }

 .fa-3x{
    color: #58D68D ;
 }
 a span{
    color: #58D68D !important;
 }
 .fa-cash-register{
     padding-right: 13px;
 }

</style>