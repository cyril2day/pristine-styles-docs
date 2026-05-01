<script setup lang="ts">
import TokenBadge from '../ui/TokenBadge.vue'

type Shadow = {
  name: string
  token: string
}

type Radius = {
  name: string
  token: string
  size: string
}

type ZIndex = {
  name: string
  token: string
  level: number
}

type OpacityOption = {
  name: string
  token: string
  value: number
}

const SHADOWS: Shadow[] = [
  { name: 'None', token: '--shadow-none' },
  { name: 'Small', token: '--shadow-sm' },
  { name: 'Medium', token: '--shadow-md' },
  { name: 'Large', token: '--shadow-lg' },
  { name: 'Focus', token: '--shadow-focus' },
]

const RADII: Radius[] = [
  { name: 'None', token: '--radius-none', size: '0px' },
  { name: 'XS', token: '--radius-xs', size: '2px' },
  { name: 'Small', token: '--radius-sm', size: '4px' },
  { name: 'Medium', token: '--radius-md', size: '6px' },
  { name: 'Large', token: '--radius-lg', size: '8px' },
  { name: 'XL', token: '--radius-xl', size: '12px' },
  { name: '2XL', token: '--radius-2xl', size: '16px' },
  { name: '3XL', token: '--radius-3xl', size: '20px' },
  { name: 'Full', token: '--radius-full', size: '9999px' },
]

const Z_INDICES: ZIndex[] = [
  { name: 'Base', token: '--z-index-base', level: 0 },
  { name: 'Dropdown', token: '--z-index-dropdown', level: 1000 },
  { name: 'Sticky', token: '--z-index-sticky', level: 1020 },
  { name: 'Fixed', token: '--z-index-fixed', level: 1030 },
  { name: 'Modal Backdrop', token: '--z-index-modal-backdrop', level: 1040 },
  { name: 'Modal', token: '--z-index-modal', level: 1050 },
  { name: 'Popover', token: '--z-index-popover', level: 1060 },
  { name: 'Tooltip', token: '--z-index-tooltip', level: 1070 },
  { name: 'Toast', token: '--z-index-toast', level: 1080 },
  { name: 'Max', token: '--z-index-max', level: 9999 },
]

const OPACITIES: OpacityOption[] = [
  { name: '0%', token: '--opacity-0', value: 0 },
  { name: '25%', token: '--opacity-25', value: 0.25 },
  { name: '50%', token: '--opacity-50', value: 0.5 },
  { name: '75%', token: '--opacity-75', value: 0.75 },
  { name: '100%', token: '--opacity-100', value: 1 },
]
</script>

<template>
  <section 
    id="effects"
    class="section"
    data-section
  >
    <div class="section-header">
      <p class="eyebrow">Effects & Polish</p>
      <h2>Shadows, radius, z-index, and opacity</h2>

      <p>
        Depth, emphasis, and layering tokens for building visual hierarchy and interactive states.
      </p>
    </div>

    <!-- Shadows -->
    <div class="subsection">
      <h3>Shadows</h3>
      <p class="subsection-description">
        Depth layers for elevating elements
      </p>

      <div class="shadows-grid">
        <div
          v-for="shadow in SHADOWS"
          :key="shadow.token"
          class="shadow-demo"
          :style="{ boxShadow: `var(${shadow.token})` }"
        >
          <span class="shadow-label">
            {{ shadow.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Border Radius -->
    <div class="subsection">
      <h3>Border Radius</h3>
      <p class="subsection-description">
        Rounding levels from sharp to full circle
      </p>

      <div class="radii-grid">
        <div 
          v-for="radius in RADII"
          :key="radius.token"
          class="radius-demo"
          :style="{ borderRadius: `var(${radius.token})` }"
        >
          <span class="radius-label">
            {{ radius.name }}
          </span>
          <code class="radius-size">
            {{ radius.size }}
          </code>
        </div>
      </div>
    </div>

    <!-- Z-Index -->
    <div class="subsection">
      <h3>Z-Index Layers</h3>
      <p class="subsection-description">
        Stacking order for UI layering
      </p>

      <div class="z-index-list">
        <div
          v-for="zi in Z_INDICES"
          :key="zi.token"
          class="z-index-item"
        >
          <span class="z-name">
            {{ zi.name }}
          </span>

          <span class="z-value">
            {{ zi.level }}
          </span>

          <TokenBadge :name="zi.token" />
        </div>
      </div>
    </div>

    <!-- Opacity -->
    <div class="subsection">
      <h3>Opacity Levels</h3>
      <p class="subsection-description">
        Transparency values
      </p>

      <div class="opacity-grid">
        <div
          v-for="opacity in OPACITIES"
          :key="opacity.token"
          class="opacity-demo"
          :style="{ opacity: opacity.value }"
        >
          <span class="opacity-label">
            {{ opacity.name }}
          </span>
        </div>
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

.shadows-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}

.shadow-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--space-20);
  padding: var(--space-4);
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  .shadow-label {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
  }
}

.radii-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
}

.radius-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: var(--space-16);
  background-color: var(--color-blue);
  gap: var(--space-2);

  .radius-label {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-white);
  }

  .radius-size {
    font-size: var(--text-xs);
    color: rgba(255, 255, 255, 0.8);
    background: none;
    padding: 0;
  }
}

.z-index-list {
  display: grid;
  gap: var(--space-3);
}

  .z-index-item {
    display: grid;
    grid-template-columns: 8rem minmax(0, 1fr) 11.8rem;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3);
    background-color: var(--color-surface-muted);
    border-radius: var(--radius-md);

  .z-name {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
  }

  .z-value {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }
}

.opacity-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
}

.opacity-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--space-20);
  background-color: var(--color-cyan);
  border-radius: var(--radius-md);

  .opacity-label {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-white);
  }
}
</style>
