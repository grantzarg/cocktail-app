import type { CocktailApiResponse, CocktailCode } from '@/types/cocktail'
import { api, API_ORIGIN } from './api'

export const getCocktails = ({
  origin = API_ORIGIN,
  signal,
  searchTerm,
}: {
  origin?: string
  signal?: AbortSignal
  searchTerm: CocktailCode
}): Promise<{
  drinks: CocktailApiResponse['drinks']
}> =>
  api(`${origin}/api/json/v1/1/search.php`, { s: searchTerm }, 'GET', {
    signal,
  })
