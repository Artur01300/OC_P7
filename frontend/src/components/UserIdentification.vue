<template>
    <div>
        <!--Section qui s'affiche si le user n'est pas connecté-->
        <div v-if="!isLoggedIn">
            <router-link to="/api/auth/signup" ><button type= "button" ><i class="fas fa-user-plus"></i> Inscription</button></router-link><br/>
            <router-link to="/api/auth/login"><button type= "button"><i class="fas fa-sign-in-alt"></i> Connexion</button></router-link>
            <router-view />
        </div>
        <!--Section qui s'affiche si le user est connecté-->
        <div v-else>
            <button type="button" @click="logout"><i class="fas fa-sign-out-alt"></i> Déconnexion</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'UserIdentification',
    props: {
        logout: {
            type: Function,
            required: true
        },
        isLoggedIn: {
            type: Boolean,
            required: true,
            default: false
        }
    }
}
</script>