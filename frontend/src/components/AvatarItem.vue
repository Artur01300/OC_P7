<template>
        
      <div class="avatarContainer" v-if="avatar">
        <img class="avatarImg" v-bind:src="'http://localhost:3000/images/' + avatar" :alt="`Avatar de ${altName}`">
    </div>
    <div class="avatarContainer" v-else>
        <img class="avatarImg" src="img/id-Image.webp" alt="">
    </div>
</template>

<script>
export default{
    props:{
        avatar:{
            type: String,
            required: true
        },
        altName:{
            type: String,
            required: null
        }
    }
}
</script>

<style>
.avatarContainer img{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 1em;
}
</style>