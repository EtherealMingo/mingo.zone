import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundComponent from '../components/common/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/photo',
      name: 'photo',
      component: () => import('../views/PhotoView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)', component: NotFoundComponent }
  ]
})

export default router
