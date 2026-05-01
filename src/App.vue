<script setup lang="ts">
import { ref, provide, onMounted, readonly } from 'vue'
import type { ThemeMode } from '@/domain/ui'
import { useActiveSection } from '@/composables/useActiveSection'
import { useMenu } from '@/composables/useMenu'
import { nextThemeMode, applyThemeSetting, loadPersistedThemeSetting } from '@/effects/theme'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import SectionColors from '@/components/sections/SectionColors.vue'
import SectionDarkMode from '@/components/sections/SectionDarkMode.vue'
import SectionTypography from '@/components/sections/SectionTypography.vue'
import SectionSpacing from '@/components/sections/SectionSpacing.vue'
import SectionEffects from '@/components/sections/SectionEffects.vue'
import SectionComposition from '@/components/sections/SectionComposition.vue'
import SectionGettingStarted from '@/components/sections/SectionGettingStarted.vue'

/**
 * Dark mode state management.
 * Synchronized with localStorage and document.documentElement class.
 * Uses IO effects (lazy, synchronous) for composable side effects.
 */
const theme = ref<ThemeMode>({ kind: 'light' })

/**
 * Mobile menu state management.
 */
const { menu, isOpen: isMenuOpen, openMenu, closeMenu, toggleMenu } = useMenu()

/**
 * Toggle dark mode using pure theme helpers + IO effect pipeline.
 * applyThemeSetting runs the side effects (DOM update + localStorage persist).
 */
const toggleTheme = () => {
  theme.value = nextThemeMode(theme.value)
  applyThemeSetting(theme.value).run()
}

/**
 * Initialize dark mode from localStorage or system preference.
 * Uses IO effect to lazily load saved theme.
 */
onMounted(() => {
  const savedTheme = loadPersistedThemeSetting().run()
  theme.value = savedTheme
  applyThemeSetting(savedTheme).run()
})

/**
 * Active section tracking via scroll-spy composable.
 * Updated as sections scroll into view.
 */
const { activeSection } = useActiveSection()

/**
 * Provide theme state, menu state, and active section to all descendants.
 * Child components inject these values without prop drilling.
 */
provide('theme', readonly(theme))
provide('toggleTheme', toggleTheme)
provide('menu', menu)
provide('openMenu', openMenu)
provide('closeMenu', closeMenu)
provide('toggleMenu', toggleMenu)
provide('activeSection', activeSection)
</script>

<template>
  <div 
    class="app-shell" 
    :class="{ 'menu-open': isMenuOpen }"
  >
    <AppHeader />

    <button
      v-if="isMenuOpen"
      class="menu-scrim"
      type="button"
      aria-label="Close navigation menu"
      @click="closeMenu"
    />

    <div class="app-body">
      <AppSidebar />

      <main
        class="app-main"
        id="top"
      >
        <SectionGettingStarted />
        <SectionColors />
        <SectionDarkMode />
        <SectionTypography />
        <SectionSpacing />
        <SectionEffects />
        <SectionComposition />

        <footer class="docs-footer">
          <p>
            2026 all rights reserved. 
            Built by <strong>psi</strong>, a small design systems builder and tinkerer.
          </p>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../pristine-styles/scss/index' as ps;

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &.menu-open {
    overflow: hidden;
  }
}

.menu-scrim {
  display: none;
  position: fixed;
  inset: 0;
  z-index: var(--z-index-modal-backdrop);
  background-color: rgba(0, 0, 0, 0.5);

  @media (max-width: 63.999rem) {
    display: block;
  }
}

.app-body {
  display: grid;
  grid-template-columns: 1fr;
  flex: 1;

  @include ps.breakpoint-up('md') {
    grid-template-columns: 16rem 1fr;
  }
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  padding: var(--space-8) var(--space-6);

  @include ps.breakpoint-up('md') {
    padding: var(--space-8);
  }
}

.docs-footer {
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-base);
  color: var(--color-text-muted);

  p {
    margin: 0;
  }
}
</style>

