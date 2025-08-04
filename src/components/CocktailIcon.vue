<template>
  <svg viewBox="0 0 24 24" fill="currentColor" class="cocktail-icon">
    <!-- Margarita -->
    <g v-if="type === 'margarita'">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M8 12l2 2 6-6" stroke="currentColor" stroke-width="2" fill="none"/>
    </g>
    
    <!-- Mojito -->
    <g v-else-if="type === 'mojito'">
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
    </g>
    
    <!-- A1 -->
    <g v-else-if="type === 'a1'">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>
      <path d="M9 12h6" stroke="white" stroke-width="2"/>
    </g>
    
    <!-- Kir -->
    <g v-else-if="type === 'kir'">
      <circle cx="12" cy="12" r="8" fill="currentColor"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </g>
    
    <!-- Default -->
    <g v-else>
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M8 12l2 2 6-6" stroke="currentColor" stroke-width="2" fill="none"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  type: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.cocktail-icon {
  width: 100%;
  height: 100%;
}
</style> 