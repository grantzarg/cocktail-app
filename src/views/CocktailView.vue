<template>
  <div class="cocktail-view">
    <div class="layout">
      <aside class="sidebar">
        <nav class="cocktail-navigation">
        
  
          <ul class="navigation-list desktop-nav">
            <li v-for="category in categories" :key="category.code" class="navigation-item">
              <router-link
                :to="{ name: 'cocktail', params: { cocktailCode: category.code } }"
                class="navigation-link"
                :class="{ active: isActive(category.code) }"
                @click="scrollToTop"
              >
                {{ category.name }}
              </router-link>
            </li>
          </ul>

          <div class="nav-header">
            <ThemeToggle />
          </div>
          
          <div class="mobile-nav">
            <button 
              class="mobile-nav-toggle"
              @click="toggleMobileNav"
              :class="{ active: isMobileNavOpen }"
            >
              <svg class="toggle-icon" :class="{ open: isMobileNavOpen }" width="20" height="20" viewBox="0 0 20 20">
                <polyline points="5,8 10,13 15,8" fill="none" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="toggle-text">{{ getActiveCategoryName() }}</span>
            </button>
            
            <div class="mobile-nav-dropdown" :class="{ open: isMobileNavOpen }">
              <ul class="mobile-nav-list">
                <li class="mobile-nav-item" v-for="category in categories" :key="category.code">
                  <router-link
                    :to="{ name: 'cocktail', params: { cocktailCode: category.code } }"
                    class="mobile-nav-link"
                    :class="{ active: isActive(category.code) }"
                    @click="closeMobileNav"
                  >
                    {{ category.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      
      <main class="main-content">
        <div class="container">
                          <div v-if="isLoading" class="loading">
          <LoadingSpinner text="Loading cocktails..." />
        </div>
        
        <div v-else-if="error" class="error">
          <h2>Loading Error</h2>
          <p>{{ error }}</p>
          <button @click="retryLoad" class="retry-button">Try Again</button>
        </div>
        
        <div v-else-if="cocktails.length === 0" class="no-cocktails">
          <h2>No Cocktails Found</h2>
          <p>No cocktails found for your request.</p>
        </div>
          
          <div v-else class="cocktails-grid">
            <CocktailCard
              v-for="cocktail in cocktails"
              :key="cocktail.idDrink"
              :cocktail="cocktail"
              class="cocktail-item"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCocktailStore } from '@/stores/cocktail'
import CocktailCard from '@/components/CocktailCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import type { CocktailCode } from '@/types/cocktail'

interface Props {
  cocktailCode: CocktailCode
}

defineProps<Props>()
const route = useRoute()
const cocktailStore = useCocktailStore()

const currentCode = computed(() => route.params.cocktailCode as CocktailCode)
const cocktails = computed(() => cocktailStore.getCocktailsByCode(currentCode.value))
const isLoading = computed(() => cocktailStore.isLoading(currentCode.value))
const error = computed(() => cocktailStore.getError(currentCode.value))

const categories = computed(() => cocktailStore.categories)

const isMobileNavOpen = ref(false)

const isActive = (code: CocktailCode): boolean => {
  return route.params.cocktailCode === code
}

const getActiveCategoryName = (): string => {
  const activeCategory = categories.value.find(cat => isActive(cat.code))
  return activeCategory?.name || 'Select Cocktail'
}

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const closeMobileNav = () => {
  isMobileNavOpen.value = false

  scrollToTop()
}

const loadCocktails = async () => {
  await cocktailStore.fetchCocktails(currentCode.value)
}

const retryLoad = () => {
  loadCocktails()
}

onMounted(() => {
  loadCocktails()
})

watch(currentCode, () => {
  loadCocktails()
})
</script>

<style lang="scss" scoped>
.cocktail-view {
  min-height: 100vh;
  background: var(--bg-primary);
}

.layout {
  display: flex;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.sidebar {
  width: 200px;
  background: var(--nav-bg);
  border-right: 1px solid var(--border-color);
  z-index: 1;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-right: none;
    border-bottom: none;
    background: transparent;
    padding: 16px;
  }
}

  .nav-header {
    padding: 16px 24px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    
    @media (max-width: 768px) {
      padding: 12px 16px;
      border-bottom: none;
    }
  }

  .cocktail-navigation {
    padding: 16px 0;
    position: sticky;
    top: 0;

    @media (max-width: 768px) {
      padding: 0;
    }

  .navigation-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 8px;

    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: space-around;
      gap: 8px;
      padding: 16px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin: 16px;
    }
  }

  .navigation-item {
    margin: 0;
  }

  .navigation-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    padding: 16px 24px;
    display: block;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;

    &:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      border-left-color: var(--text-muted);
    }

    &.active {
      background: var(--card-bg);
      color: var(--text-primary);
      border-left-color: var(--text-primary);
      font-weight: 600;
    }
  }

  // Mobile Navigation Styles
  .mobile-nav {
    display: none;
    
    @media (max-width: 768px) {
      display: block;
      position: relative;
    }
  }

  .mobile-nav-toggle {
    width: 100%;
    padding: 16px 20px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px var(--shadow-color);

    &:hover {
      background: var(--bg-secondary);
    }

    &.active {
      border-color: var(--text-primary);
      background: var(--bg-secondary);
    }
  }

  .toggle-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(0deg);
    will-change: transform;
    margin-right: 8px;
    &.open {
      transform: rotate(180deg);
    }
  }

  .toggle-text {
    flex: 1;
    text-align: left;
    margin-left: 12px;
  }

  .mobile-nav-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-top: none;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 8px var(--shadow-color);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;

    &.open {
      max-height: 300px;
    }
  }

  .mobile-nav-list {
    list-style: none;
    margin: 0;
    padding: 8px 0;
  }

  .mobile-nav-item {
    margin: 0;
  }

  .mobile-nav-link {
    display: block;
    padding: 12px 20px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    &.active {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      font-weight: 600;
    }
  }

  // Hide desktop nav on mobile
  .desktop-nav {
    @media (max-width: 768px) {
      display: none;
    }
  }
}

.main-content {
  flex: 1;
  min-height: 100vh;
  width: 100%;
  min-width: 0;
  
  @media (max-width: 768px) {
    padding-top: 80px;
  }

  .container {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0 32px;
    min-width: 0;
    
    @media (max-width: 768px) {
      padding: 0 16px;
    }
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }

  .error {
    text-align: center;
    color: var(--text-secondary);
    padding: 32px;

    h2 {
      margin: 0 0 16px 0;
      font-size: 24px;
      color: #dc3545;
    }

    p {
      margin: 0 0 24px 0;
      font-size: 16px;
      color: var(--text-muted);
    }

    .retry-button {
      background: #dc3545;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #c82333;
      }
    }
  }

  .no-cocktails {
    text-align: center;
    color: var(--text-secondary);
    padding: 32px;

    h2 {
      margin: 0 0 16px 0;
      font-size: 24px;
      color: var(--text-muted);
    }

    p {
      margin: 0;
      font-size: 16px;
      color: var(--text-muted);
    }
  }

  .cocktails-grid {
    padding: 16px 0;
    width: 100%;

    .cocktail-item {
      width: 100%;
      min-width: 0;
    }
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 8px 0;
    }
  }
}

// Анимация spin теперь в компоненте LoadingSpinner

@media (max-width: 768px) {
  .main-content {
    .container {
      padding: 0 8px;
    }

    .cocktails-grid {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 8px 0;
    }
  }
}

@media (max-width: 480px) {
  .main-content {
    .cocktails-grid {
      gap: 16px;
    }
  }
}
</style> 