<template>
    <div>
        <!--Section qui s'affiche si la page qui appelle ce component est celle qui affiche un commentaire en particulier-->
        <div v-if="this.$route.name == 'one-comment-details'" class="card text-center">
            <!-- <div class="card-header card__header">

                <p v-if="comment"><i class="fas fa-comments"></i><strong>Commentaire posté le : </strong>
                    {{ new Date(created_at).toLocaleDateString() }} 
                    <strong>par </strong> {{ name }}
                </p>
          
                <p class="card-text">{{ content }}</p>
            </div> -->
        </div>
        <!--Section qui s'affiche si la page qui appelle ce component est celle qui affiche la liste complète des commentaires-->
        <div v-else class="card text-center">   
            <div class="card-header card__header">
                <p v-if="content"><i class="fas fa-comments"></i><strong> Commentaire posté le :</strong> {{ new Date(created_at).toLocaleDateString('fr-CA') }} <strong>par </strong> {{ name }}</p>
                <p class="card-text card__text ">{{ content }}</p>
            </div>
        </div> 
    </div>
</template>


<script>
    
export default {
	name: "CommentsItem",
	props: {
		content: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		created_at: {
			type: String,
			required: false
		},
        id_comment: {
			type: Number,
			required: false
		}
	}
}
    
</script>