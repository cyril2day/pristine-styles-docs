<script setup lang="ts">
import { inject, computed } from 'vue'
import type { Ref } from 'vue'
import { fromNullable, foldMaybe } from '@/effects/index'
import type { MenuState } from '@/domain/ui'
import { NAV_ITEMS } from '@/constants/navigation'

// Injected from App.vue (domain types)
const activeSection = inject<Ref<string>>('activeSection', computed(() => 'colors'))
const menu = inject<Ref<MenuState> | undefined>('menu')
const closeMenu = inject<(() => void) | undefined>('closeMenu')

const menuMaybe = fromNullable(menu)
const closeMenuMaybe = fromNullable(closeMenu)

const isMenuOpen = computed(
  () => foldMaybe(
    () => false,
    (mRef: Ref<MenuState>) => mRef.value.kind === 'open'
  )(menuMaybe)
)

const safeCloseMenu = () => foldMaybe(
  () => undefined,
  (f: () => void) => f()
)(closeMenuMaybe)

const isActive = (sectionId: string) => activeSection.value === sectionId

/**
 * Close menu when clicking on a link
 */
const handleLinkClick = () => {
  if (isMenuOpen.value) {
    safeCloseMenu()
  }
}
</script>

<template>
  <aside 
    id="app-sidebar"
    class="app-sidebar"
    :class="{ 'is-open': isMenuOpen }"
  >
    <nav 
      class="sidebar-nav"
      aria-label="Page sections"
    >
      <p class="sidebar-label">On this page</p>
      <a
        v-for="item in NAV_ITEMS"
        :key="item.id"
        :href="item.href"
        class="sidebar-link"
        :class="{ 'is-active': isActive(item.id) }"
        :aria-current="isActive(item.id) ? 'page' : false"
        @click="handleLinkClick"
      >
        {{ item.label }}
      </a>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
@use 'pristine-styles/scss' as ps;

.app-sidebar {
  position: sticky;
  top: var(--space-16);
  height: fit-content;
  max-height: calc(100vh - var(--space-16));
  padding: var(--space-6) 0;
  overflow-y: auto;
  border-right: 1px solid var(--color-border);
  transition: all var(--transition-normal);

  @media (max-width: 63.999rem) {
    display: block;
    position: fixed;
    inset: 0;
    width: 16rem;
    height: 100vh;
    max-height: none;
    padding: var(--space-20) 0;
    border-right: 1px solid var(--color-border);
    border-top: none;
    background-color: var(--color-background);
    z-index: var(--z-index-modal);
    transform: translateX(-100%);
    visibility: hidden;
    pointer-events: none;
    overflow-y: auto;

    &.is-open {
      transform: translateX(0);
      visibility: visible;
      pointer-events: auto;
    }
  }
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sidebar-label {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-widest);
  margin: 0;
}

.sidebar-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: var(--text-sm);
  border-left: 2px solid transparent;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  transition: all var(--transition-normal);
  margin-right: var(--space-2);
  cursor: pointer;

  &:hover {
    color: var(--color-text);
    background-color: var(--color-surface-muted);
    border-left-color: var(--color-link);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: -2px;
  }

  &.is-active {
    color: var(--color-text);
    background-color: var(--color-surface-raised);
    border-left-color: var(--color-link);
    font-weight: var(--font-weight-semibold);
  }
}
</style>

