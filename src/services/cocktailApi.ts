import type { CocktailCode } from '@/types/cocktail'
import { getCocktails } from './cocktails'

export async function getCocktailsByCode(code: CocktailCode) {
  const response = await getCocktails({ searchTerm: code })
  return response.drinks || []
}
