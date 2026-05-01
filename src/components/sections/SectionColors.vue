<script setup lang="ts">
import ColorSwatch from '@/components/ui/ColorSwatch.vue'

type ColorToken = {
  name: string
  label: string
}

// Palette: raw named colors (don't change between themes)
const PALETTE: ColorToken[] = [
  { name: '--color-red', label: 'Red' },
  { name: '--color-orange', label: 'Orange' },
  { name: '--color-yellow', label: 'Yellow' },
  { name: '--color-green', label: 'Green' },
  { name: '--color-mint', label: 'Mint' },
  { name: '--color-teal', label: 'Teal' },
  { name: '--color-cyan', label: 'Cyan' },
  { name: '--color-blue', label: 'Blue' },
  { name: '--color-indigo', label: 'Indigo' },
  { name: '--color-purple', label: 'Purple' },
  { name: '--color-pink', label: 'Pink' },
  { name: '--color-brown', label: 'Brown' },
  { name: '--color-white', label: 'White' },
  { name: '--color-black', label: 'Black' },
  { name: '--color-gray', label: 'Gray' },
  { name: '--color-gray2', label: 'Gray 2' },
  { name: '--color-gray3', label: 'Gray 3' },
  { name: '--color-gray4', label: 'Gray 4' },
  { name: '--color-gray5', label: 'Gray 5' },
  { name: '--color-gray6', label: 'Gray 6' },
]

// Semantic tokens: change between light and dark themes
const SEMANTIC_TOKENS: ColorToken[] = [
  { name: '--color-background', label: 'Background' },
  { name: '--color-surface', label: 'Surface' },
  { name: '--color-surface-raised', label: 'Surface Raised' },
  { name: '--color-surface-muted', label: 'Surface Muted' },
  { name: '--color-surface-inset', label: 'Surface Inset' },
  { name: '--color-border', label: 'Border' },
  { name: '--color-border-strong', label: 'Border Strong' },
  { name: '--color-text', label: 'Text' },
  { name: '--color-text-muted', label: 'Text Muted' },
  { name: '--color-text-subtle', label: 'Text Subtle' },
  { name: '--color-text-disabled', label: 'Text Disabled' },
  { name: '--color-link', label: 'Link' },
  { name: '--color-link-hover', label: 'Link Hover' },
  { name: '--color-focus-ring', label: 'Focus Ring' },
  { name: '--shadow-color', label: 'Shadow Color' },
  { name: '--shadow-color-strong', label: 'Shadow Color Strong' },
]

</script>

<template>
  <section id="colors" class="section" data-section>
    <div class="section-header">
      <p class="eyebrow">Colors</p>
      <h2>Palette and semantic tokens</h2>

      <p>
        20 base colors, plus semantic tokens that switches between light and dark. 
        Use the semantic ones in your UI for consistency.
      </p>
    </div>

    <!-- Palette Section -->
    <div class="subsection">
      <h3>Base Colors</h3>
      <p class="subsection-description">
        The core palette.
      </p>

      <div
        class="grid-spacious"
      >
        <ColorSwatch
          v-for="color in PALETTE"
          :key="color.name"
          :name="color.name"
          :label="color.label"
        />
      </div>
    </div>

    <!-- Semantic Layer Section -->
    <div class="subsection">
      <h3>Semantic Tokens</h3>
      <p class="subsection-description">
        Changes based on the theme. 
        Use these in your UI instead of the base colors.
      </p>

      <div
        class="grid-spacious color-grid"
      >
        <ColorSwatch
          v-for="color in SEMANTIC_TOKENS"
          :key="color.name"
          :name="color.name"
          :label="color.label"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../../pristine-styles/scss/index' as ps;

.subsection {
  display: grid;
  gap: var(--space-4);

  h3 {
    margin: 0;
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    letter-spacing: -0.01em;
  }

  .subsection-description {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-base);
  }
}

.color-grid {
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
}

.info-callout {
  padding: var(--space-4);
  background-color: var(--color-surface-muted);
  border-left: 3px solid var(--color-blue);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--text-sm);
  line-height: var(--line-height-relaxed);

  strong {
    display: block;
    margin-bottom: var(--space-1);
    color: var(--color-text);
  }
}
</style>
