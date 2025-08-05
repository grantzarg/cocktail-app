<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #212529;
  --text-secondary: #495057;
  --text-muted: #6c757d;
  --border-color: #e9ecef;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --card-bg: #ffffff;
  --nav-bg: #f8f9fa;
}

[data-theme='dark'] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-tertiary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --border-color: #374151;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --card-bg: #1f2937;
  --nav-bg: #111827;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-primary);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

#app {
  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--bg-tertiary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
</style>
