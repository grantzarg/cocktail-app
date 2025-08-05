<template>
  <div class="cocktail-card">
    <div class="cocktail-layout">
      <div class="cocktail-content">
        <h3 class="cocktail-title">{{ cocktail.strDrink }}</h3>

        <div class="cocktail-info">
          <div v-if="cocktail.strCategory" class="info-item">
            <span class="info-label">Category:</span>
            <span class="info-value">{{ cocktail.strCategory }}</span>
          </div>

          <div v-if="cocktail.strAlcoholic" class="info-item">
            <span class="info-label">Type:</span>
            <span class="info-value">{{ cocktail.strAlcoholic }}</span>
          </div>

          <div v-if="cocktail.strGlass" class="info-item">
            <span class="info-label">Glass:</span>
            <span class="info-value">{{ cocktail.strGlass }}</span>
          </div>
        </div>

        <div v-if="cocktail.strInstructions" class="cocktail-instructions">
          <h4 class="section-title">Instructions</h4>
          <p class="instructions-text">{{ cocktail.strInstructions }}</p>
        </div>

        <div v-if="ingredients.length > 0" class="cocktail-ingredients">
          <h4 class="section-title">Ingredients</h4>
          <div class="ingredients-grid">
            <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-item">
              <span class="ingredient-name">{{ ingredient.name }}</span>
              <span v-if="ingredient.measure" class="ingredient-measure">{{
                ingredient.measure
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="cocktail-image">
        <ImageLoader :src="cocktail.strDrinkThumb || ''" :alt="cocktail.strDrink" :lazy="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Cocktail } from '@/types/cocktail'
import { extractIngredients } from '@/utils/cocktailUtils'
import ImageLoader from '@/components/ImageLoader.vue'

interface Props {
  cocktail: Cocktail
}

const props = defineProps<Props>()

const ingredients = computed(() => extractIngredients(props.cocktail))
</script>

<style lang="scss" scoped>
.cocktail-card {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  min-width: 0;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  @media (min-width: 769px) {
    &:hover {
      border-color: var(--text-muted);
      box-shadow: 0 4px 12px var(--shadow-color);
      transform: translateY(-2px);
    }
  }

  .cocktail-layout {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 24px;
    }
  }

  .cocktail-image {
    width: 100%;
    padding: 20px;
    height: 200px;
    flex-shrink: 0;

    @media (min-width: 768px) {
      width: 300px;
      height: 300px;
      order: 2;
    }
  }

  .cocktail-content {
    padding: 20px;
    flex: 1;
    order: 1;

    .cocktail-title {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      text-align: left;
    }

    .cocktail-info {
      margin-bottom: 16px;

      .info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        padding: 4px 0;
        font-size: 14px;

        .info-label {
          font-weight: 500;
          color: var(--text-muted);
        }

        .info-value {
          color: var(--text-secondary);
          font-weight: 500;
        }
      }
    }

    .cocktail-ingredients {
      .section-title {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--text-primary);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .ingredients-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 8px;

        .ingredient-item {
          display: flex;
          justify-content: space-between;
          padding: 6px 8px;
          background: var(--bg-secondary);
          border-radius: 4px;
          font-size: 13px;

          .ingredient-name {
            color: var(--text-secondary);
            font-weight: 500;
          }

          .ingredient-measure {
            color: var(--text-muted);
            font-style: italic;
            font-size: 12px;
          }
        }
      }
    }

    .cocktail-instructions {
      margin-bottom: 16px;

      .section-title {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--text-primary);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .instructions-text {
        margin: 0;
        line-height: 1.5;
        color: var(--text-secondary);
        font-size: 14px;
        text-align: justify;
      }
    }
  }
}

@media (max-width: 768px) {
  .cocktail-card {
    .cocktail-content {
      padding: 16px;

      .cocktail-title {
        font-size: 16px;
        text-align: center;
      }

      .ingredients-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
