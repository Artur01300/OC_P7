<template>
    <div>
        <h2>Pour accéder sur le réseau social de votre entreprise vous devez vous identifier !</h2>
        <!-- <router-link to="/signup"><button  type= "button"><i class="fas fa-user-plus"></i> Inscription</button></router-link>
        <router-link to="/login"><button type= "button"><i class="fas fa-sign-in-alt"></i> Connexion</button></router-link> -->
        <router-view />
    </div>
</template>

<script>
    
export default {
    name: "InLogin"
}

</script>