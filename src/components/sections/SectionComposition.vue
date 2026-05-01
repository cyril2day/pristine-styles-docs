<script setup lang="ts">
type CardVariant = {
  title: string
  description: string
}

const CARD_VARIANTS: CardVariant[] = [
  {
    title: 'Minimal Card',
    description: 'Simple card with content only. Uses surface token and subtle border.',
  },
  {
    title: 'Card with Image',
    description: 'Card with image placeholder. Image uses inset surface color.',
  },
  {
    title: 'Card with Action',
    description: 'Card with call-to-action button. Button inherits link color token.',
  },
  {
    title: 'Disabled Card',
    description: 'Card in disabled state. Uses text-disabled and reduced opacity.',
  },
]
</script>

<template>
  <section id="composition" class="section" data-section>
    <div class="section-header">
      <p class="eyebrow">A Few Example UI Components</p>
      <h2>Built entirely from design tokens</h2>

      <p>
        See how tokens in designs you’d actually build. It’s all CSS custom properties, nothing hardwired.
      </p>
    </div>

    <!-- Cards -->
    <div class="subsection">
      <h3>Cards</h3>

      <p class="subsection-description">
        Card variations using surface, spacing, and shadow tokens
      </p>

      <div class="cards-grid">
        <div
          v-for="(card, idx) in CARD_VARIANTS"
          :key="idx"
          class="card-example panel"
        >
          <h4>{{ card.title }}</h4>
          <p>{{ card.description }}</p>
          <button
            v-if="idx === 2" 
            class="card-button"
          >Learn more</button>

          <div
            v-if="idx === 1"
            class="card-image"
          >Image placeholder</div>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="subsection">
      <h3>Button States</h3>
      <p class="subsection-description">Button variations with consistent styling</p>
      <div class="buttons-demo">
        <button class="button-primary">Primary Button</button>
        <button class="button-secondary">Secondary Button</button>
        <button class="button-tertiary">Tertiary Button</button>
        <button class="button-disabled" disabled>Disabled Button</button>
      </div>
    </div>

    <!-- Forms -->
    <div class="subsection">
      <h3>Form Elements</h3>
      <p class="subsection-description">Input variations with focus and disabled states</p>
      <div class="form-demo">
        <div class="form-group">
          <label>Input Label</label>
          <input type="text" placeholder="Text input" />
        </div>
        <div class="form-group">
          <label>Select Label</label>
          <select>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" />
            Checkbox option
          </label>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div class="subsection">
      <h3>Alert Types</h3>
      <p class="subsection-description">Alert variations with semantic color borders</p>
      <div class="alerts-demo">
        <div class="alert alert-info">
          <strong>Information</strong> — This is an informational message.
        </div>
        <div class="alert alert-warning">
          <strong>Warning</strong> — This is a warning message.
        </div>
        <div class="alert alert-error">
          <strong>Error</strong> — This is an error message.
        </div>
        <div class="alert alert-success">
          <strong>Success</strong> — This is a success message.
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

.cards-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.card-example {
  h4 {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--text-base);
    font-weight: var(--font-weight-semibold);
  }

  p {
    margin: 0 0 var(--space-3) 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    line-height: var(--line-height-relaxed);
  }
}

.card-button {
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-link);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background-color: var(--color-link-hover);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
}

.card-image {
  height: 8rem;
  background-color: var(--color-surface-muted);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.buttons-demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface-muted);
  border-radius: var(--radius-md);
}

.button-primary,
.button-secondary,
.button-tertiary,
.button-disabled {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 1px solid transparent;
}

.button-primary {
  background-color: var(--color-link);
  color: white;

  &:hover {
    background-color: var(--color-link-hover);
  }
}

.button-secondary {
  background-color: transparent;
  color: var(--color-link);
  border-color: var(--color-link);

  &:hover {
    background-color: var(--color-surface-raised);
  }
}

.button-tertiary {
  background-color: transparent;
  color: var(--color-text);
  border: none;

  &:hover {
    text-decoration: underline;
  }
}

.button-disabled {
  background-color: var(--color-surface-raised);
  color: var(--color-text-disabled);
  opacity: var(--opacity-50);
  cursor: not-allowed;
}

.form-demo {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-4);
  background-color: var(--color-surface-muted);
  border-radius: var(--radius-md);
}

.form-group {
  display: grid;
  gap: var(--space-2);

  label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--text-sm);
  }

  input[type='text'],
  select {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface-raised);
    color: var(--color-text);
    font-family: inherit;
    font-size: var(--text-sm);
    transition: all var(--transition-normal);

    &:focus {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 0;
    }

    &::placeholder {
      color: var(--color-text-subtle);
    }
  }
}

.alerts-demo {
  display: grid;
  gap: var(--space-3);
}

.alert {
  padding: var(--space-3) var(--space-4);
  border-left: 3px solid;
  border-radius: var(--radius-md);
  background-color: var(--color-surface-muted);
  font-size: var(--text-sm);

  strong {
    display: block;
    margin-bottom: var(--space-1);
  }
}

.alert-info {
  border-left-color: var(--color-blue);
}

.alert-warning {
  border-left-color: var(--color-orange);
}

.alert-error {
  border-left-color: var(--color-red);
}

.alert-success {
  border-left-color: var(--color-green);
}
</style>
