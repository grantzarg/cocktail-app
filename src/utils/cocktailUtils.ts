import type { Cocktail } from '@/types/cocktail'

const MAX_INGREDIENTS = 15

export interface Ingredient {
  name: string
  measure: string | null
}

export function extractIngredients(cocktail: Cocktail): Ingredient[] {
  return Array.from({ length: MAX_INGREDIENTS }, (_, i) => {
    const num = i + 1
   
    const name = cocktail[`strIngredient${num}` as keyof Cocktail]?.trim()
    const measure = cocktail[`strMeasure${num}` as keyof Cocktail]?.trim()
    
    return name ? { name, measure: measure ?? null } : null
  }).filter((item): item is Ingredient => item !== null)
}
