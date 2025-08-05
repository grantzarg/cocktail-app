import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CocktailCard from '../CocktailCard.vue'
import type { Cocktail } from '@/types/cocktail'

describe('CocktailCard', () => {
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
    strMeasure1: '2 oz',
    strMeasure2: '1 oz',
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

  it('should render cocktail name', () => {
    const wrapper = mount(CocktailCard, {
      props: {
        cocktail: mockCocktail,
      },
    })

    expect(wrapper.text()).toContain('Test Cocktail')
  })

  it('should render cocktail category', () => {
    const wrapper = mount(CocktailCard, {
      props: {
        cocktail: mockCocktail,
      },
    })

    expect(wrapper.text()).toContain('Cocktail')
  })

  it('should render cocktail instructions', () => {
    const wrapper = mount(CocktailCard, {
      props: {
        cocktail: mockCocktail,
      },
    })

    expect(wrapper.text()).toContain('Test instructions')
  })

  it('should render ingredients', () => {
    const wrapper = mount(CocktailCard, {
      props: {
        cocktail: mockCocktail,
      },
    })

    expect(wrapper.text()).toContain('Vodka')
    expect(wrapper.text()).toContain('Lime juice')
    expect(wrapper.text()).toContain('2 oz')
    expect(wrapper.text()).toContain('1 oz')
  })
})
