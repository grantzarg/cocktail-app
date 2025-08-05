import { createRouter, createWebHistory } from 'vue-router'
import CocktailView from '@/views/CocktailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import type { CocktailCode } from '@/types/cocktail'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/margarita',
    },
    {
      path: '/:cocktailCode',
      name: 'cocktail',
      component: CocktailView,
      props: true,
      beforeEnter: (to, from, next) => {
        const validCodes: CocktailCode[] = ['margarita', 'mojito', 'a1', 'kir']
        const cocktailCode = to.params.cocktailCode as string

        if (validCodes.includes(cocktailCode as CocktailCode)) {
          next()
        } else {
          next('/404')
        }
      },
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

export default router
