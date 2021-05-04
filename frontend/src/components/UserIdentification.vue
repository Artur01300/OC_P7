<template>
    <div>
        <!--Section s'affiche si le user n'est pas connecté-->
        <div v-if="!isLoggedIn">
            <router-link to="/" >
                <b-button variant="success" type= "button">
                    <i class="fas fa-user-plus"></i> 
                    Login 
                </b-button>
            </router-link><br/>
        </div>
        <!--Section s'affiche si le user est connecté-->
        <div v-else>
            <b-button variant="success" type="button" @click="logout">
                <i class="fas fa-sign-out-alt"></i> 
                Déconnexion
            </b-button><br><br>
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
