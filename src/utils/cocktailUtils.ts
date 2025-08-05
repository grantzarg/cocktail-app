import type { Cocktail, IngredientKey, MeasureKey } from '@/types/cocktail'

const MAX_INGREDIENTS = 15

export interface Ingredient {
  name: string
  measure: string | null
}

export function extractIngredients(cocktail: Cocktail): Ingredient[] {
  const ingredients: Ingredient[] = []

  let i = 1
  while (i <= MAX_INGREDIENTS) {
    const ingredientKey: IngredientKey = `strIngredient${i}`
    const measureKey: MeasureKey = `strMeasure${i}`

    const ingredient = cocktail[ingredientKey]
    const measure = cocktail[measureKey]

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() ?? null,
      })
    } else {
      break
    }

    i++
  }

  return ingredients
}
