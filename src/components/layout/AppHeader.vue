<script setup lang="ts">
import { inject, computed } from 'vue'
import type { Ref } from 'vue'
import { fromNullable, foldMaybe } from '@/effects/index'
import type { ThemeMode, MenuState } from '@/domain/ui'
import { NAV_ITEMS } from '@/constants/navigation'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

// Injected from App.vue (domain types)
const theme = inject<Ref<ThemeMode> | undefined>('theme')
const toggleTheme = inject<(() => void) | undefined>('toggleTheme')
const menu = inject<Ref<MenuState> | undefined>('menu')
const toggleMenu = inject<(() => void) | undefined>('toggleMenu')

const themeMaybe = fromNullable(theme)
const toggleThemeMaybe = fromNullable(toggleTheme)
const menuMaybe = fromNullable(menu)
const toggleMenuMaybe = fromNullable(toggleMenu)

const isDarkMode = computed(
  () => foldMaybe(
    () => false,
    (tRef: Ref<ThemeMode>) => tRef.value.kind === 'dark'
  )(themeMaybe)
)
const isMenuOpen = computed(
  () => foldMaybe(
    () => false,
    (mRef: Ref<MenuState>) => mRef.value.kind === 'open'
  )(menuMaybe)
)

const safeToggleTheme = () => foldMaybe(
  () => undefined,
  (f: () => void) => f()
)(toggleThemeMaybe)

const safeToggleMenu = () => foldMaybe(
  () => undefined,
  (f: () => void) => f()
)(toggleMenuMaybe)
</script>

<template>
  <header class="app-header">
    <a
      class="site-brand"
      href="#top"
      aria-label="Pristine Styles home"
    >
      <strong>Pristine Styles</strong>
    </a>

    <nav
      class="site-nav"
      aria-label="Main navigation"
    >
      <a
        v-for="item in NAV_ITEMS"
        :key="item.id"
        :href="item.href"
        aria-label="Main navigation"
      >
        {{ item.label }}
      </a>
    </nav>

    <div class="header-actions">
      <button
        class="menu-button"
        :aria-label="`${isMenuOpen ? 'Close' : 'Open'} navigation menu`"
        aria-controls="app-sidebar"
        :aria-expanded="isMenuOpen"
        @click="safeToggleMenu"
      >
        <CloseIcon
          v-if="isMenuOpen"
          :size="20"
        />

        <MenuIcon
          v-else
          :size="20"
        />
      </button>

      <button
        class="theme-toggle"
        :aria-label="`Switch to ${isDarkMode ? 'light' : 'dark'} mode`"
        @click="safeToggleTheme"
      >
        <SunIcon
          v-if="isDarkMode"
          :size="20" 
        />

        <MoonIcon
          v-else
          :size="20"
        />
      </button>

      <a
        class="github-link"
        href="https://github.com/cyril2day-uopeople/pristine-styles"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="View the pristine-styles project on GitHub"
      >
        <GitHubIcon :size="20" />
      </a>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use 'pristine-styles/scss' as ps;

.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-tooltip);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.site-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: inherit;
  transition: var(--transition-normal);
  flex-shrink: 0;
  font-size: var(--text-base);
  font-weight: var(--font-weight-bold);

  &:hover {
    color: var(--color-link);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
}

.site-nav {
  display: flex;
  gap: var(--space-6);
  margin-left: auto;

  a {
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    transition: var(--transition-normal);
    white-space: nowrap;

    &:hover {
      color: var(--color-text);
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 4px;
    }
  }

  @media (max-width: 63.999rem) {
    display: none;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.menu-button {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-lg);
  transition: var(--transition-normal);

  &:hover {
    background-color: var(--color-surface);
    border-color: var(--color-border-strong);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 63.999rem) {
    display: flex;
  }
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text);
  transition: var(--transition-normal);

  &:hover {
    background-color: var(--color-surface);
    border-color: var(--color-border-strong);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }
}

.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text);
  transition: var(--transition-normal);

  &:hover {
    background-color: var(--color-surface);
    border-color: var(--color-border-strong);
    color: var(--color-link);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>

