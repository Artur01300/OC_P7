<template>
    <div>
        <!--Section affiche les commentaires-->
        <div v-if="this.$route.name == 'OneCommentDetails'" class="container_form card_color containter_position text-center"></div>
        <div v-else class="card_color text-center">
            <div class="card-header">
                <span v-if="name">
                    <i class="fas fa-comments"></i>
                    Commentaire posté par <strong> {{ name }} </strong>
                </span><br>
                <span v-if="!name">
                    Commentaire posté
                </span>
                <span v-if="created_at"> Le {{new Date(created_at).toLocaleDateString()}}</span><br><br>
                <p class="card-text border border-warning">{{ content }}</p><br>
                <a v-if="owner" class="btn btn-warning icon-text" :href="'/ArticleDetails/comment/' + id_comment" aria-label="Détails du commentaire">
                    <i class="far fa-trash-alt"></i>
                    Supprimer
                </a>
            </div>
        </div> 
    </div>
</template>

<script>
    
export default {
	name: "OneCommentDetails",
	props: {
		content: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: null
		},
		created_at: {
			type: String,
			required: true
		},
        id_comment: {
            type: Number,
            required: null
        },
        owner: {
            type: Boolean,
            required: null
        }
	}
}
    
</script>

<style>
    .card_color{
        background: rgba(0, 0, 0, 0.1);
        color: white;
        font-size: 1.5em;
    }

    .containter_position{
        padding-top: 20px;
    }
</style>