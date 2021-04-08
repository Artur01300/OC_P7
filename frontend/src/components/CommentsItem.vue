<template>
    <div>
        <!--Section affiche un commentaire séléctioné-->
        <div v-if="this.$route.name == 'oneCommentDetails'" class="card text-center">
            <div class="card-header card__header">
                <p><i class="fas fa-comments"></i> Commentaire posté le : {{ new Date(created_at).toLocaleDateString() }} par {{ name }}</p>
            </div>
            <div class="card-body card__body">
                <p class="card-text card__text ">{{ content }}</p>
            </div>
        </div>
        <!--Section s'affiche tout les commentaires-->
        <div v-else class="card text-center">   
            <div class="card-header card__header">
                <p v-if="content">
                    <i class="fas fa-comments"></i>
                        Commentaire posté par : <strong> {{ name }} </strong> le : {{new Date(created_at).toLocaleDateString()}}
                    <a class="btn btn-primary card__btnDetails icon-text" :href="'/ArticleDetails/comment/' + id_comment" aria-label="Détails du commentaire">
                        <i class="fas fa-info-circle"></i> 
                        Détails
                    </a>
                </p>
                <p class="card-text card__text ">{{ content }}</p>
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