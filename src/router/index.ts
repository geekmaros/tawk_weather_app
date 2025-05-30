import { createRouter, createWebHistory } from 'vue-router'
import CityListPage from '@/pages/CityListPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CityListPage,
    },
    {
      path: '/weather/:city',
      name: 'WeatherDetailPage',
      component: () => import('@/pages/WeatherDetailPage.vue'),
      props: (route) => ({
        city: route.params.city,
        lat: route.query.lat,
        lon: route.query.lon,
      }),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
