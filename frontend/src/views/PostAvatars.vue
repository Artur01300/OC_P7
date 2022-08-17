<template>
<main>
    <div>
        <p>Artur, aidez les autres utilisateurs à vous reconnaître.</p>

        <form action="">
            <input class="inputImageUload"
                type="file" 
                ref="image" 
                id="imageUpload"
                required
                @model="formData.image"
                accept="image/*"
                v-on:change="handleFileUpload()"
            >
                
            <label class="btnImageUload" for="imageUpload" >Télécharger la photo</label>
            <button id="submit"  type="submit" value="Submit" @click.prevent="saveAvatarImg()">Enregistrer la photo</button>
        </form>
    </div>
</main>


</template>


<script>
import { mapState } from "vuex";
import AvatarUrlData from "../service/PostAvatars";

export default{
    name: "PostAvatars",
    data(){
        return {
            formData: {
                image: ""
            }
        }
    },
    computed:{
        ...mapState({ token: "token"})
    },
    
    methods:{
         handleFileUpload(){
            //Réstriction pour la taile de l'image: l'image ne doit pas dépassé le 1.2 Mo
            this.formData.image = this.$refs.image.files[0];
            let imageSize = this.formData.image.size;
            const MAX_HEIGHT = 1200000;

            if (imageSize > MAX_HEIGHT){
                alert('La taile de l\'image ne doit pas dépasser le 1.2 Mo !');
            }
        },
        saveAvatarImg(Authorization){
            let formData = new FormData();
            formData.append('image', this.formData.image);

            Authorization = this.token;

            AvatarUrlData.createAvatar(formData, {Authorization})
           .then(response => {
                console.log(response.data.message);
            })
            .catch(error => console.log(error));
        }
    }
}
</script>


<style>
.header[data-v-7ba5bd90]{
    position: relative;
}
.btnImageUload{
    border-radius: 20px;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    background-color:aquamarine;
    font-size: 1.6rem;
    min-height: 3.2rem;
    padding: 0.6rem 1.2rem;
    line-height: 2rem;
    cursor: pointer;
}
.btnImageUload:hover{
    background-color: rgb(129, 176, 176);
}
.inputImageUload{
    display: none;
}

</style>