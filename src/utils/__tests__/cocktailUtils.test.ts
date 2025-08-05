import { describe, it, expect } from 'vitest'
import { extractIngredients } from '../cocktailUtils'
import type { Cocktail } from '@/types/cocktail'

describe('cocktailUtils', () => {
  describe('extractIngredients', () => {
    it('should extract ingredients from cocktail', () => {
      const mockCocktail: Cocktail = {
        idDrink: '1',
        strDrink: 'Test Cocktail',
        strDrinkAlternate: null,
        strTags: null,
        strVideo: null,
        strCategory: 'Cocktail',
        strIBA: null,
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
        strInstructions: 'Test instructions',
        strInstructionsES: null,
        strInstructionsDE: null,
        strInstructionsFR: null,
        strInstructionsIT: null,
        strInstructionsZH_HANS: null,
        strInstructionsZH_HANT: null,
        strDrinkThumb: 'test.jpg',
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null,
        strIngredient1: 'Vodka',
        strIngredient2: 'Lime juice',
        strIngredient3: 'Sugar',
        strIngredient4: null,
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: '2 oz',
        strMeasure2: '1 oz',
        strMeasure3: '1 tsp',
        strMeasure4: null,
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
      }

      const result = extractIngredients(mockCocktail)

      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({
        name: 'Vodka',
        measure: '2 oz',
      })
      expect(result[1]).toEqual({
        name: 'Lime juice',
        measure: '1 oz',
      })
      expect(result[2]).toEqual({
        name: 'Sugar',
        measure: '1 tsp',
      })
    })

    it('should handle empty ingredients', () => {
      const mockCocktail: Cocktail = {
        idDrink: '1',
        strDrink: 'Test Cocktail',
        strDrinkAlternate: null,
        strTags: null,
        strVideo: null,
        strCategory: 'Cocktail',
        strIBA: null,
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
        strInstructions: 'Test instructions',
        strInstructionsES: null,
        strInstructionsDE: null,
        strInstructionsFR: null,
        strInstructionsIT: null,
        strInstructionsZH_HANS: null,
        strInstructionsZH_HANT: null,
        strDrinkThumb: 'test.jpg',
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null,
        strIngredient1: null,
        strIngredient2: null,
        strIngredient3: null,
        strIngredient4: null,
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: null,
        strMeasure2: null,
        strMeasure3: null,
        strMeasure4: null,
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
      }

      const result = extractIngredients(mockCocktail)

      expect(result).toHaveLength(0)
    })
  })
})
