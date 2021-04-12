<template>
    <div>
        <!--Section affiche un commentaire séléctioné-->
        <div v-if="this.$route.name == 'OneCommentDetails'" class="container_form card_color containter_position text-center">
            <div class="card-header">
                <p><i class="fas fa-comments"></i> Commentaire posté le : {{ new Date(created_at).toLocaleDateString() }} par {{ name }}</p>
            </div>
            <div class="card-body card__body">
                <p class="card-text">{{ content }}</p>
            </div>
        </div>
        <!--Section s'affiche tout les commentaires-->
        <div v-else class="card_color text-center">   
            <div class="card-header">
                <p v-if="content">
                    <i class="fas fa-comments"></i>
                    Commentaire posté par : <strong> {{ name }} </strong> le : {{new Date(created_at).toLocaleDateString()}}
                </p>
                <p class="card-text">{{ content }}</p>
                <a v-if="id_comment" class="btn btn-success card__btnDetails icon-text" :href="'/ArticleDetails/comment/' + id_comment" aria-label="Détails du commentaire">
                    <i class="fas fa-info-circle"></i> 
                    Modifier
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
			required: false // fails ???
		},
		created_at: {
			type: String,
			required: true
		},
        id_comment: {
            type: Number,
            required: false // fails ????
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