import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Cocktail, CocktailCode, CocktailCategory } from '@/types/cocktail'
import { getCocktailsByCode } from '@/services/cocktailApi'

export const useCocktailStore = defineStore('cocktail', () => {
  const cocktails = ref<Cocktail[]>([])

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const theme = ref<'light' | 'dark'>('light')

  const activeCategory = ref<CocktailCode>('margarita')

  const isMobileNavOpen = ref(false)

  const categories: CocktailCategory[] = [
    { code: 'margarita', name: 'Margarita' },
    { code: 'mojito', name: 'Mojito' },
    { code: 'a1', name: 'A1' },
    { code: 'kir', name: 'Kir' },
  ]

  const hasCocktails = computed(() => cocktails.value.length > 0)
  const hasError = computed(() => error.value !== null)

  const fetchCocktails = async (code: CocktailCode) => {
    isLoading.value = true
    error.value = null

    try {
      console.log(`Загружаем коктейли для: ${code}`)
      const data = await getCocktailsByCode(code)
      console.log(`Получено коктейлей: ${data.length}`)
      cocktails.value = data
    } catch (err) {
      console.error('Ошибка загрузки коктейлей:', err)
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке коктейлей'
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

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
  }

  const toggleMobileNav = () => {
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

  return {
    cocktails,
    isLoading,
    error,
    theme,
    activeCategory,
    isMobileNavOpen,
    categories,

    hasCocktails,
    hasError,

    fetchCocktails,
    setActiveCategory,
    toggleTheme,
    setTheme,
    toggleMobileNav,
    closeMobileNav,
    clearError,
    retryLoad,
  }
})
