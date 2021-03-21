import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Article from '../views/Articles.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    data: ()=>{
      return
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/articles',
    name: 'articles-list',
    component: Article
  }
]

const router =  new VueRouter({
  mode: 'history',
  routes

})

export default router
