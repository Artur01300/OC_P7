import Vue from 'vue';
import VueRouter from 'vue-router';

import Article from '../views/Articles.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import ArticleDetails from '../views/ArticleDetails.vue';
import PostArticle from '../views/PostArticle.vue';
import PostComment from '../views/PostComment.vue';
import OneCommentDetails from '../views/OneCommentDetails.vue';

Vue.use(VueRouter)

const routes = [
  {//lier à Articlsitem.vue. affiche tous les articles postés
    path: '/articles',
    name: 'articles-list',
    component: Article
  },
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
  {//Poste article
    path: '/articles/creat',
    name: 'post-article',
    component: PostArticle
  },
  {
    path: '/ArticleDetails/:id_article', 
    name: 'one-article-details',
    component: ArticleDetails
  },
  {
    path: '/ArticleDetails/:id_article/comment/',
    name: 'commentsList',
    component: PostComment
  },
  {
    path: '/ArticleDetails/comment/:id_comment',
    name: 'oneCommentDetails',
    component: OneCommentDetails
  }   
];

const router =  new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

});

export default router;
