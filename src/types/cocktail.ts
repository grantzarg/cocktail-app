export type IngredientKey = `strIngredient${number}`
export type MeasureKey = `strMeasure${number}`

export type CocktailIngredients = {
  [K in IngredientKey]: string | null
}

export type CocktailMeasures = {
  [K in MeasureKey]: string | null
}

export type CocktailKeys = keyof Cocktail

export type CocktailIngredientKeys = keyof CocktailIngredients

export type CocktailMeasureKeys = keyof CocktailMeasures

interface CocktailBase {
  idDrink: string
  strDrink: string
  strDrinkAlternate: string | null
  strTags: string | null
  strVideo: string | null
  strCategory: string | null
  strIBA: string | null
  strAlcoholic: string | null
  strGlass: string | null
  strInstructions: string | null
  strInstructionsES: string | null
  strInstructionsDE: string | null
  strInstructionsFR: string | null
  strInstructionsIT: string | null
  strInstructionsZH_HANS: string | null
  strInstructionsZH_HANT: string | null
  strDrinkThumb: string | null
  strImageSource: string | null
  strImageAttribution: string | null
  strCreativeCommonsConfirmed: string | null
  dateModified: string | null
}

export interface Cocktail extends CocktailBase, CocktailIngredients, CocktailMeasures {}

export interface CocktailApiResponse {
  drinks: Cocktail[] | null
}

export type CocktailCode = 'margarita' | 'mojito' | 'a1' | 'kir'

export interface CocktailCategory {
  code: CocktailCode
  name: string
}
