import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Article from '../views/Articles.vue'
import ArticleDetails from '../views/ArticleDetails.vue'
import PostArticle from '../views/PostArticle.vue'
// import CommentPost from '/..views/CommentPost.vue'

import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  
  {//lier à Articlsitem.vue. affiche tous les articles postés
    path: '/articles',
    name: 'articles-list',
    component: Article
  },
  {//Poste article
    path: '/articles/creat',
    name: 'post-article',
    component: PostArticle
  },
  {
    path: '/ArticleDetails/:id_article',
    name: 'one-article-details',// ??
    component: ArticleDetails
  },
  // {
  //   path: '/Articles/:id_comment/comments',
  //   name: 'comments-list',
  //   component: CommentPost

  // }
]

const router =  new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

})

export default router
