<script setup lang="ts">
import TokenBadge from '@/components/ui/TokenBadge.vue'

type SpaceToken = {
  name: string
  token: string
  value: string
}

type SemanticSpace = {
  name: string
  token: string
  preview?: string
}

const NUMERIC_SPACES: SpaceToken[] = [
  { name: '0', token: '--space-0', value: '0px' },
  { name: '2xs', token: '--space-2xs', value: '2px' },
  { name: '1', token: '--space-1', value: '4px' },
  { name: '2', token: '--space-2', value: '8px' },
  { name: '3', token: '--space-3', value: '12px' },
  { name: '4', token: '--space-4', value: '16px' },
  { name: '5', token: '--space-5', value: '20px' },
  { name: '6', token: '--space-6', value: '24px' },
  { name: '8', token: '--space-8', value: '32px' },
  { name: '10', token: '--space-10', value: '40px' },
  { name: '12', token: '--space-12', value: '48px' },
  { name: '16', token: '--space-16', value: '64px' },
  { name: '20', token: '--space-20', value: '80px' },
]

const SEMANTIC_SPACES: SemanticSpace[] = [
  { name: '3xs', token: '--space-3xs', preview: 'stack' },
  { name: 'xs', token: '--space-xs', preview: 'stack' },
  { name: 'sm', token: '--space-sm', preview: 'stack' },
  { name: 'md', token: '--space-md', preview: 'stack' },
  { name: 'lg', token: '--space-lg', preview: 'stack' },
  { name: 'xl', token: '--space-xl', preview: 'stack' },
  { name: '2xl', token: '--space-2xl', preview: 'stack' },
  { name: '3xl', token: '--space-3xl', preview: 'stack' },
]
</script>

<template>
  <section
    id="spacing"
    class="section"
    data-section
  >
    <div class="section-header">
      <p class="eyebrow">Spacing System</p>
      <h2>Spacings with semantic aliases</h2>
      <p>
        Use numeric values for precision or semantic
        aliases for intent-driven design.
      </p>
    </div>

    <!-- Numeric Scale -->
    <div class="subsection">
      <h3>Numeric Scale</h3>
      <p class="subsection-description">
        Visual representation of spacing values
      </p>

      <div class="spacing-grid">
        <div
          v-for="space in NUMERIC_SPACES"
          :key="space.token"
          class="space-item"
        >
          <div
            class="space-bar" 
            :style="{ width: `calc(${space.value} + 0.5rem)` }" 
          />

          <div class="space-info">
            <span class="space-name">
              {{ space.name }}
            </span>

            <code class="space-value">
              {{ space.value }}
            </code>
          </div>
        </div>
      </div>
    </div>

    <!-- Semantic Aliases -->
    <div class="subsection">
      <h3>Semantic Aliases</h3>
      <p class="subsection-description">
        The tokens demonstrated here involve gaps and padding. 
        Apply them when you want spacing to convey meaning, not just numerical dimensions.
      </p>

      <div class="aliases-list">
        <div
          v-for="space in SEMANTIC_SPACES"
          :key="space.token"
          class="type-row alias-row"
        >
          <span class="type-name">
            {{ space.name }}
          </span>

          <span
            class="alias-preview"
            aria-hidden="true"
          >
            <span class="alias-preview-box alias-preview-box--stack">
              <span
                class="alias-preview-stack"
                :style="{ gap: `var(${space.token})`, padding: `var(${space.token})` }"
              >
                <span class="alias-preview-chip">A</span>
                <span class="alias-preview-chip">B</span>
              </span>
            </span>
          </span>

          <TokenBadge :name="space.token" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'pristine-styles/scss' as ps;

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

.spacing-grid {
  display: grid;
  gap: var(--space-3);
}

.space-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);

  .space-bar {
    height: 1rem;
    border-radius: var(--radius-sm);
    background: linear-gradient(90deg, var(--color-blue), var(--color-cyan));
    min-width: 0.5rem;
  }

  .space-info {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    min-width: 10rem;

    .space-name {
      font-size: var(--text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text);
      min-width: 2rem;
    }

    .space-value {
      font-size: var(--text-xs);
      color: var(--color-text-muted);
      background: none;
      padding: 0;
    }
  }
}

.aliases-list {
  display: grid;
  gap: var(--space-3);
}

.type-row {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-3);
  background-color: var(--color-surface-muted);
  border-radius: var(--radius-md);

  @media (min-width: 40rem) {
    grid-template-columns: 6rem minmax(0, 1fr) auto;
    align-items: center;
  }

  .type-name {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-wide);
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .sample-text {
    margin: 0;
    font-weight: var(--font-weight-semibold);
    line-height: 1;
    color: var(--color-text);
  }
}

.alias-preview {
  display: block;
}

.alias-preview-box {
  display: inline-flex;
  width: fit-content;
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-raised);
}

.alias-preview-box--stack {
  align-items: stretch;
}

.alias-preview-stack {
  display: flex;
  width: fit-content;
}

.alias-preview-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75rem;
  height: 1.75rem;
  padding: 0 var(--space-2);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface-muted);
  border: 1px solid var(--color-border-strong);
  color: var(--color-text);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family-sans);
}

.alias-row {
  .alias-description {
    margin: 0;
    max-width: 60ch;
  }
}
</style>
