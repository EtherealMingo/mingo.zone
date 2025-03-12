import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
<<<<<<< HEAD
=======
import NotFoundComponent from '../components/common/NotFoundView.vue'
>>>>>>> 6ac7edc21728880c9b6a1489730bd3a1592767b0

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
<<<<<<< HEAD
      component: HomeView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
  ],
=======
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
>>>>>>> 6ac7edc21728880c9b6a1489730bd3a1592767b0
})

export default router
