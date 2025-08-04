<template>
  <div class="image-loader">
    <div v-if="loading" class="loading-placeholder">
      <div class="loading-spinner"></div>
    </div>
    
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      @load="onLoad"
      @error="onError"
      class="image"
      :class="{ 'image-loaded': !loading }"
    />
    
    <div v-if="error" class="error-placeholder">
      <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
      </svg>
                   <span class="error-text">Loading Error</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  src: string
  alt: string
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true
})

const loading = ref(true)
const error = ref(false)

const onLoad = () => {
  loading.value = false
  error.value = false
}

const onError = () => {
  loading.value = false
  error.value = true
}

// Сбрасываем состояние при изменении src
watch(() => props.src, (newSrc) => {
  if (newSrc && newSrc.trim()) {
    loading.value = true
    error.value = false
    
    // Проверяем, не загружено ли изображение уже в кэше
    const img = new Image()
    img.onload = () => {
      loading.value = false
    }
    img.onerror = () => {
      loading.value = false
      error.value = true
    }
    img.src = newSrc
  } else {
    loading.value = false
    error.value = true
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.image-loader {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f8f9fa;
  border-radius: 8px;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--bg-secondary);

    .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--bg-tertiary);
    border-top: 3px solid var(--text-muted);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

       .error-placeholder {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         width: 100%;
         height: 100%;
         background: var(--bg-secondary);
         color: var(--text-muted);

  .error-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 8px;
    opacity: 0.5;
  }

  .error-text {
    font-size: 12px;
    font-weight: 500;
  }
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    object-position: top;
  }

  &.image-loaded {
    opacity: 1;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 