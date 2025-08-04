import type { CocktailApiResponse, CocktailCode } from '@/types/cocktail'

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

export class CocktailApiService {
  private static async fetchCocktails(code: CocktailCode): Promise<CocktailApiResponse> {
    try {
      const url = `${API_BASE_URL}/search.php?s=${code}`
      console.log(`Запрос к API: ${url}`)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Ответ API:', data)
      return data
    } catch (error) {
      console.error('Error fetching cocktails:', error)
      throw error
    }
  }

  static async getCocktailsByCode(code: CocktailCode) {
    const response = await this.fetchCocktails(code)
    return response.drinks || []
  }
} 