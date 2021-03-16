import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'

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
  }
]

const router =  new VueRouter({
  mode: 'history',
  routes
  // history: createWebHashHistory(),
  // routes
})

export default router
