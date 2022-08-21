<template>
<main>

    <AvatarItem
        :image="courentAvatar[0].avatar"
    />
</main>
</template>

<script>
import AvatarItem from "../components/AvatarItem"
import AvatarUrlData from "../service/ArticlesUrlDada";
import { mapState } from 'vuex';


export default{
//    name: 'articles-list',
    componets:{
        AvatarItem
    },
    data(){
        return{
            courentAvatar:[],
            image: ""
        }
    },
    computed:{
        ...mapState({token: "token"})
    },
    methods:{
        getAvatar(Authorization){
            Authorization = this.token;
            AvatarUrlData.getOneAvatar({Authorization})
            .then(res =>{
                this.courentAvatar = JSON.parse(JSON.stringify(res.data.data))
                console.log(this.courentAvatar);
            })
            .catch(err => console.log(err));
        }
    },
    beforeMount() {
        this.getAvatar(this.token)
    }
}
</script>