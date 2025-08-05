<template>
  <div class="loading-spinner-container">
    <div class="loading-spinner">
      <div v-for="i in 3" :key="i" class="spinner-ring"></div>
    </div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6c757d;
}

.loading-spinner {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 16px;

  .spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #6c757d;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      width: 80%;
      height: 80%;
      top: 10%;
      left: 10%;
      animation-delay: -0.4s;
    }

    &:nth-child(3) {
      width: 60%;
      height: 60%;
      top: 20%;
      left: 20%;
      animation-delay: -0.8s;
    }
  }
}

.loading-text {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
