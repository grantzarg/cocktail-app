import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

const savedTheme = localStorage.getItem('theme') as Theme
if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
  theme.value = savedTheme
}

const applyTheme = (newTheme: Theme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}

// Initialize theme on app start
applyTheme(theme.value)

// Watch for theme changes
watch(theme, (newTheme) => {
  applyTheme(newTheme)
})

export const useTheme = () => {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme
  }
} 