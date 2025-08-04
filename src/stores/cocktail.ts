import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Cocktail, CocktailCode, CocktailCategory } from '@/types/cocktail'
import { CocktailApiService } from '@/services/cocktailApi'

export const useCocktailStore = defineStore('cocktail', () => {
  const cocktails = ref<Record<CocktailCode, Cocktail[]>>({
    margarita: [],
    mojito: [],
    a1: [],
    kir: []
  })
  
  const loading = ref<Record<CocktailCode, boolean>>({
    margarita: false,
    mojito: false,
    a1: false,
    kir: false
  })
  
  const errors = ref<Record<CocktailCode, string | null>>({
    margarita: null,
    mojito: null,
    a1: null,
    kir: null
  })

  const categories: CocktailCategory[] = [
    { code: 'margarita', name: 'Margarita' },
    { code: 'mojito', name: 'Mojito' },
    { code: 'a1', name: 'A1' },
    { code: 'kir', name: 'Kir' }
  ]

  const getCocktailsByCode = computed(() => {
    return (code: CocktailCode) => cocktails.value[code]
  })

  const isLoading = computed(() => {
    return (code: CocktailCode) => loading.value[code]
  })

  const getError = computed(() => {
    return (code: CocktailCode) => errors.value[code]
  })

  const fetchCocktails = async (code: CocktailCode) => {
    // Если данные уже загружены, не делаем повторный запрос
    if (cocktails.value[code].length > 0) {
      return
    }

    loading.value[code] = true
    errors.value[code] = null

    try {
      console.log(`Загружаем коктейли для: ${code}`)
      const data = await CocktailApiService.getCocktailsByCode(code)
      console.log(`Получено коктейлей: ${data.length}`)
      cocktails.value[code] = data
    } catch (error) {
      console.error('Ошибка загрузки коктейлей:', error)
      errors.value[code] = error instanceof Error ? error.message : 'Произошла ошибка при загрузке коктейлей'
    } finally {
      loading.value[code] = false
    }
  }

  return {
    cocktails,
    loading,
    errors,
    categories,
    getCocktailsByCode,
    isLoading,
    getError,
    fetchCocktails
  }
}) 