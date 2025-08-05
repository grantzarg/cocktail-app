import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Cocktail, CocktailCode, CocktailCategory } from '@/types/cocktail'
import { getCocktailsByCode } from '@/services/cocktailApi'

const CATEGORIES: CocktailCategory[] = [
  { code: 'margarita', name: 'Margarita' },
  { code: 'mojito', name: 'Mojito' },
  { code: 'a1', name: 'A1' },
  { code: 'kir', name: 'Kir' },
]

export const useCocktailStore = defineStore('cocktail', () => {
  const cocktails = ref<Cocktail[]>([])
  const cache = ref<Partial<Record<CocktailCode, Cocktail[]>>>({})

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const theme = ref<'light' | 'dark'>('light')

  const activeCategory = ref<CocktailCode>('margarita')

  const isMobileNavOpen = ref(false)

  const hasCocktails = computed(() => cocktails.value.length > 0)
  const hasError = computed(() => error.value !== null)

  const fetchCocktails = async (code: CocktailCode) => {

    if (cache.value[code]) {
      cocktails.value = cache.value[code]!
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const data = await getCocktailsByCode(code)
      cocktails.value = data
      cache.value[code] = data // Сохраняем в кеш
    } catch (err) {
      error.value = (err as Error)?.message ?? 'Error loading cocktails'
    } finally {
      isLoading.value = false
    }
  }

  const setActiveCategory = (code: CocktailCode) => {
    activeCategory.value = code
    fetchCocktails(code)
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const toggleMobileNavMenu = () => {
    isMobileNavOpen.value = !isMobileNavOpen.value
  }

  const closeMobileNav = () => {
    isMobileNavOpen.value = false
  }

  const clearError = () => {
    error.value = null
  }

  const retryLoad = () => {
    fetchCocktails(activeCategory.value)
  }

  const clearCache = () => {
    cache.value = {}
  }

  const refreshCategory = async (code: CocktailCode) => {
    delete cache.value[code] 
    await fetchCocktails(code)
  }

  return {
    cocktails,
    isLoading,
    error,
    theme,
    activeCategory,
    isMobileNavOpen,
    categories: CATEGORIES,

    hasCocktails,
    hasError,

    fetchCocktails,
    setActiveCategory,
    toggleTheme,
    toggleMobileNavMenu,
    closeMobileNav,
    clearError,
    retryLoad,
    clearCache,
    refreshCategory,
  }
})
