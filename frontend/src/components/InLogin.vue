<template>
    <div>
        <h2>Pour profiter des fonctionnalités de cette plate-forme, merci de vous identifier ou de créer un compte !</h2>
        <router-link to="/api/auth/signup"><button  type= "button"><i class="fas fa-user-plus"></i> Inscription</button></router-link>
        <router-link to="/api/auth/login"><button type= "button"><i class="fas fa-sign-in-alt"></i> Connexion</button></router-link>
        <router-view />
    </div>
</template>

<script>
    
export default {
    name: "InLogin"
}

</script>