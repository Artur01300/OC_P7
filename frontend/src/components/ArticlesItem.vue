<!--COMPONENT CORRESPONDANT A L'AFFICHAGE D'UN ARTICLE (UTILISE DANS LES PAGES ARTICLES.VUE ET ARTICLEDETAILS.VUE)-->

<template>
    <div>
        <!--Section qui s'affiche si la page qui appelle ce component est celle qui affiche la liste complète des articles-->
        <div v-if="this.$route.name == 'articles-list'" class="card text-center">
            <div class="card-body card__body">
                <h3 class="card-title card__title">{{ title }}</h3>
                <p class="card-subtitle card__subtitle">{{ content }}</p>
                <p class="card__date">Article posté le : {{ new Date(create_at).toLocaleDateString('fr-CA') }} par {{ name }}</p>
            </div>
            <a class="btn btn-secondary card__btnDetails" :href="'/articles/' + id_user"><i class="fas fa-info-circle"></i> En savoir plus</a>
        </div>
        <!--Section qui s'affiche si la page qui appelle ce component est celle qui affiche un article en particulier-->
        <div v-else class="card text-center">
            <div class="card-header card__header">
                <ul class="list-group">
                    <li class="list-group-item card__comments">
                        <a href="#commentsList"><i class="far fa-eye"></i> Voir tous les commentaires</a>
                        <a :href="'/articles/' + id_user + '/comments'"><i class="far fa-edit"></i> Poster un commentaire</a>
                    </li>
                    <li class="list-group-item">
                        <!--La section suivante ne s'affiche que si le user a liké ou disliké l'article-->
                        <div v-if="liked || disliked" >
                            <!--La section suivante ne s'affiche que si le user a liké l'article : donc le pouce du like est rouge et celui du dislike est grisé-->
                            <div v-if="liked">
                                <span class="card__stats">{{ totalLikes }} </span><span @click="deleteThumb" class="thumbs thumbs__up thumbs__red"><i class="far fa-thumbs-up thumbs"></i></span>
                                <span class="thumbs__down thumbs disabled"><i class="far fa-thumbs-down thumbs"></i></span><span class="card__stats"> {{ totalDislikes }}</span>
                            </div>
                            <!--La section suivante ne s'affiche que si le user a disliké l'article : : donc le pouce du dislike est rouge et celui du like est grisé-->
                            <div v-else>
                                <span class="card__stats">{{ totalLikes }} </span><span class="thumbs thumbs__up disabled"><i class="far fa-thumbs-up thumbs"></i></span>
                                <span @click="deleteThumb" class="thumbs thumbs__down thumbs__red"><i class="far fa-thumbs-down thumbs"></i></span><span class="card__stats"> {{ totalDislikes }}</span>
                            </div>
                        </div>
                        <!--La section suivante s'affiche si le user n'a pas encore liké ou disliké l'article-->
                        <div v-else>
                            <div>
                                <span class="card__stats">{{ totalLikes }} </span><span @click="sendLike" class="thumbs thumbs__up"><i class="far fa-thumbs-up thumbs"></i></span>
                                <span @click="sendDislike" class="thumbs thumbs__down"><i class="far fa-thumbs-down thumbs"></i></span><span class="card__stats"> {{ totalDislikes }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card-body card__body ">
                <h2 class="card-title card__title">{{ title }}</h2>
                <p class="card-subtitle card__subtitle">{{ subject }}</p>
                <p class="card__date">Article posté le : {{ new Date(create_at).toLocaleDateString('fr-CA') }} par {{ name }}</p>
                <p class="card-text card__description">{{ content }}</p>
            </div>
            <div v-if="presenceOfLinks === true" card__links >
                <a :href="lien_web" target="_blank" class="btn btn-primary card__btnWeb" aria-label="Lien vers le site web">Lien vers l'article</a>
                <iframe :src="lien_web" width="300px" height="200px" title="Aperçu du site web" aria-label="Aperçu du site web" sandbox class="card__iframe"></iframe>
            </div>
            <div v-else card__links >
            </div>
        </div>
    </div>
</template>


<script>

export default {
	name: "ArticlesItem",
	props: {
        id_user: {
            type: Number,
            required: true
        },
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
			required: true
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