<!--
    cet component affiche tous les articles postés par users .
    il est utilisé dans la page Articles.vue et ArticleDitails.vue
-->

<template>
    <div class="home_container">
        
        <!--Section affiche la liste complète des articles-->
        <div v-if="this.$route.name == 'articles-list'">

            <div class="articlesItemContainer">
                <div class="articlesItem-avatarContainer">
                    <img class="imgAvatar" src="img/id-Image.webp" :alt="`Avatar de ${name}`" v-if="!img_avatar">
                    <img class="imgAvatar" v-bind:src="'http://localhost:3000/images/' + img_avatar" :alt="`Avatar de ${name}`" v-if="img_avatar">

                    <p>{{name}}</p>
                </div>
                <a :href="'/ArticleDetails/' + id_article">

                    <p class="avatarContainer-date"> Publié le : {{new Date(create_at).toLocaleDateString()}}</p>
                    <h3 class="articlesItem-contenu articlesItemContenu-titre">{{ title }}</h3>
                    
                    <p class="articlesItem-contenu" v-if="content">Déscrpitpon : {{ content }}</p><br>
                    <!-- v-bind génère l'url dynamiquement -->
                    <img class="articlesItem-contenu" v-if="image" v-bind:src="'http://localhost:3000/images/' + image" :alt="title">

                </a>
            </div>
               
        </div>
        <!--Section affiche un article en particulier-->
         <div v-else class="card text-center">
            <div class="card-header">
                <ul class="list-group">
                    <li>
                        <!-- permet de voir les liste de commentaire d'un article -->
                        <a :href="'/ArticleDetails/' + id_article + '/comment/'">
                           <span>Commenter</span>
                           <i class="fas fa-comment fa-3x"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <p>Article posté le : {{new Date(create_at).toLocaleDateString()}}</p>
                <h2>{{title}}</h2>
                <p>{{content}}</p>
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
        },
        img_avatar:{
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

<style>

.imgAvatar{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 1em;
}

.articlesItemContainer{
    background-color: white;
    border-radius: 20px;
    padding: 28px;
    margin: 10px;
}
.articlesItemContainer a{
    text-decoration: none;
    color: black;
}
.articlesItemContainer a:hover{
    text-decoration: none;
    color: rgb(87, 84, 84);

}
.articlesItem-avatarContainer{
    display: flex;
    align-items: center;
    justify-content: left;
}
.articlesItem-avatarContainer p{
    padding-left: 1em;
    padding-top: 1em;
}
.avatarContainer-date{
    color: rgb(174, 164, 164);
    font-size: .8em;
    /* padding-bottom: 1.6em; */
}
.articlesItem-contenu{
    text-align: left;
}
.articlesItemContenu-titre{
    font-weight: bolder;
}
 .fa-cash-register{
    padding-right: 13px;
 }

</style>