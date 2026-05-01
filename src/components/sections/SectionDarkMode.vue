<script setup lang="ts">
import CodeBlock from '@/components/ui/CodeBlock.vue'

const darkModeTriggers = [
  {
    title: 'OS Preference (Automatic)',
    description:
      'The system automatically uses dark mode if the user has set it in their operating system settings.',
    code: '/* Automatic via @media query - no markup needed! */',
  },
  {
    title: 'Class Toggle',
    description: 'Add the `.dark` class to the `<html>` element to toggle dark mode manually.',
    code: '<html class="dark">\n  <!-- content -->\n</html>',
  },
  {
    title: 'Data Attribute',
    description: 'Or use the `data-theme="dark"` attribute for more semantic control.',
    code: '<html data-theme="dark">\n  <!-- content -->\n</html>',
  },
]
</script>

<template>
  <section
    id="dark-mode"
    class="section"
    data-section
  >
    <div class="section-header">
      <p class="eyebrow">Theme System</p>
      <h2>Three ways to trigger dark mode</h2>

      <p>
        Supports automatic OS detection, manual class toggling, and data attributes.
        The semantic color tokens respond to all three. 
      </p>
    </div>

    <div class="subsection">
      <h3>How Dark Mode Works</h3>
      <div class="triggers-grid">
        <div 
          v-for="(trigger, idx) in darkModeTriggers"
          :key="idx"
          class="trigger-card panel"
        >
          <h4>{{ trigger.title }}</h4>
          <p>{{ trigger.description }}</p>

          <CodeBlock :code="trigger.code" />
        </div>
      </div>
    </div>

    <div class="subsection">
      <h3>Live Example</h3>
      <p class="subsection-description">
        Both panels show the same components. 
        The other panel forces dark mode via <code>data-theme="dark"</code>.
      </p>

      <div class="theme-preview-grid">
        <div class="preview-panel">
          <p class="preview-label">Current theme</p>
          <div class="demo-content">
            <h5>Sample card</h5>
            <p>This component uses the current app theme.</p>
            <button class="demo-button">Click me</button>
          </div>
        </div>

        <div class="preview-panel" data-theme="dark">
          <p class="preview-label">Dark mode</p>
          <div class="demo-content">
            <h5>Sample card</h5>
            <p>This component shows dark mode regardless of app setting.</p>
            <button class="demo-button">Click me</button>
          </div>
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

.triggers-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));

  .trigger-card {
    h4 {
      margin: 0 0 var(--space-2) 0;
      font-size: var(--text-base);
      font-weight: var(--font-weight-semibold);
    }

    p {
      margin: 0 0 var(--space-4) 0;
      color: var(--color-text-muted);
      font-size: var(--text-sm);
      line-height: var(--line-height-relaxed);
    }
  }
}

.theme-preview-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.preview-panel {
  padding: var(--space-6);
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
}


.preview-label {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.demo-content {
  color: var(--color-text);

  h5 {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--text-base);
    font-weight: var(--font-weight-semibold);
  }

  p {
    margin: 0 0 var(--space-3) 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
}

.demo-button {
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
</style>
