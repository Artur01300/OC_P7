<template>
        
      <!-- <div class="avatarContainer">
        <img class="avatarImg" v-bind:src="'http://localhost:3000/images/' + avatar" :alt="`Avatar de ${altName}`"  v-if="avatar">
        <img class="imgAvatar" src="img/id-Image.webp"  :alt="`Avatar de ${name}`" v-if="avatar">
    </div> -->

      <div class="avatarContainer" v-if="avatar">
        <img class="avatarImg" v-bind:src="'http://localhost:3000/images/' + avatar" :alt="`Avatar de ${altName}`">
    </div>
    <div class="avatarContainer" v-else>
        <img class="avatarImg" src="img/id-Image.webp" alt="">
    </div>
    
    <!-- <div class="avatarContainer" v-else>
        <img class="avatarImg" src="img/id-Image.webp" alt="">
    </div> -->
</template>

<script>
export default{
    props:{
        avatar:{
            type: String,
            required: false
        },
        altName:{
            type: String,
            required: false
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