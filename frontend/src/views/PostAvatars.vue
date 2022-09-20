<template>
    <div class="mainAvatarContainer">
        <div class="avatarContainertest">
            <!-- <p>Artur, aidez les autres utilisateurs à vous reconnaître.</p> -->
            <button class="btnReturn" @click="returnMainBack()">X</button>
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
            </form>
                    
            <AvatarItem
                :avatar="userAvatar"
            />
            <label class="btnImageUload" for="imageUpload" >Télécharger la photo</label>
            <button id="submit"  type="submit" value="Submit" @click.prevent="saveAvatarImg()">Enregistrer la photo</button>
        </div>
    </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import AvatarUrlData from "../service/AvatarsUrls";
import AvatarItem from "../components/AvatarItem"



export default{
    name: "PostAvatars",
    components:{
        AvatarItem
    },
    data(){
        return {
            formData: {
                image: ""
            },
            userAvatar: ""
        }
    },
    computed:{
        ...mapState({ token: "token"})
    },
    
    methods:{
        ...mapMutations(['setUserAvatar']),

        returnMainBack(){
            this.$router.push({ path: "/articles" });
        },
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
        },
        getAvatar(Authorization){
            Authorization = this.token;
            AvatarUrlData.getOneAvatar({Authorization})
            .then(res =>{
                this.userAvatar = res.data.data[0].img_avatar;
                this.setUserAvatar(res.data.data[0].img_avatar);
            })
            .catch(err => console.log(err));
        }
    },
     beforeMount() {
        this.getAvatar()
    }
}
</script>

<style>
.header[data-v-7ba5bd90]{
    position: relative;
}
.mainAvatarContainer{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
}
.avatarContainertest{
    width: 40%;
    height: 60%;
    border-radius: 20px;
   background-color: rgba(155, 235, 7, 0.3);
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

.btnReturn{
    margin: 1em;
    position: absolute;
    z-index: 5;
    top: 1.2rem;
    right: 2.2rem;
}

</style>