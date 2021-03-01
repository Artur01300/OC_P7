<template>
  <div class="login">
    <div class="container">
        <div class="login-page">
            <div class="form">
              <form class="login-form">
                <input type="text" placeholder="Nom"/>
                <input type="password" placeholder="Mot de passe"/>
                <button>Conncetion</button>
                <p class="message">Vous n'êtes pas inscrit ? <router-link to="/signup">Create an account</router-link></p>
                 
              </form>
            </div>
        </div> 
    </div>
  </div>
</template>
