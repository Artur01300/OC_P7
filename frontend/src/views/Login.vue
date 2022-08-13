<template>
 <main>
   <Login/>

   <div v-if="isLoggedIn" class="testH1">
     <router-link to="/articles">Accèss au résau</router-link>
   </div>
 </main>

</template>

<script>
import Login from "../components/UsersLogin";
import { mapGetters } from 'vuex';

export default {
  components: {
    Login
  },
  computed:{
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style>
.testH1{
  padding-top: 250px;
}
</style>