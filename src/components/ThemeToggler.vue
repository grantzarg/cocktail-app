<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :class="{ dark: theme === 'dark' }"
    :aria-label="theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'"
  >
    <div class="toggle-track">
      <div class="toggle-thumb">
        <!-- Sun icon -->
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        <!-- Moon icon -->
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/utils/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style lang="scss" scoped>
.theme-toggle {
  position: relative;
  width: 48px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
}

.toggle-track {
  position: relative;
  width: 100%;
  height: 100%;
  background: #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  .dark & {
    background: #374151;
  }
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .dark & {
    transform: translateX(24px);
    background: #1f2937;
  }
}

.sun-icon,
.moon-icon {
  width: 12px;
  height: 12px;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.sun-icon {
  color: #f59e0b;
  opacity: 1;

  .dark & {
    opacity: 0;
  }
}

.moon-icon {
  position: absolute;
  color: #6366f1;
  opacity: 0;

  .dark & {
    opacity: 1;
  }
}

.theme-toggle:hover {
  .toggle-track {
    background: #d1d5db;

    .dark & {
      background: #4b5563;
    }
  }
}
</style>
