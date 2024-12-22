import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'


const router = createRouter({
  // createWebHistory()
  history: createWebHashHistory(), //createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If the returned position is falsy or an empty object,
    if (savedPosition) {
      return savedPosition;
    }
    // Always scroll to top
    return { top: 0 };
  },
})


export default router