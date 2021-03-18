<template>
    <div>
        <!--Section qui s'affiche si le user n'est pas connecté-->
        <div v-if="!isLoggedIn">
            <router-link to="/" ><button type= "button" ><i class="fas fa-user-plus"></i> Login _</button></router-link><br/>
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