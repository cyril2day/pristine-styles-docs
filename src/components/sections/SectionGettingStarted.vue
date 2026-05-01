<script setup lang="ts">
import CodeBlock from '@/components/ui/CodeBlock.vue'

type Integration = {
  title: string
  description: string
  code: string
  filename: string
}

const INSTALLATION: Integration = {
  title: 'Installation',
  description:
    'Install pristine-styles via npm or pnpm to use it in your project.',
  filename: 'terminal',
  code: `pnpm add pristine-styles`,
}

const INSTALLATION_NPM: Integration = {
  title: 'Installation (npm)',
  description: '',
  filename: 'terminal',
  code: `npm install pristine-styles`,
}

const CSS_PATH: Integration = {
  title: 'Just CSS',
  description:
    'Drop in the stylesheet and use the tokens as CSS variables. No build step needed.',
  filename: 'index.html',
  code: `
    <link rel="stylesheet" href="pristine-styles.css">
    <style>
      body {
        background: var(--color-background);
        color: var(--color-text);
        font-family: var(--font-family-sans);
      }

      .card {
        background: var(--color-surface-raised);
        padding: var(--space-6);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
      }
    </style>`,
}

const SASS_PATH: Integration = {
  title: 'Using Sass',
  description:
    'Import the Sass source from the published package to get breakpoint helpers and token variables. Gives you more control.',
  filename: 'styles.scss',
  code: `
    @use "pristine-styles/scss" as ps;

    body {
      background: var(--color-background);
      color: var(--color-text);
      font-family: var(--font-family-sans);
    }

    .card {
      background: var(--color-surface-raised);
      padding: var(--space-6);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);

      @include ps.breakpoint-up("md") {
        padding: var(--space-8);
      }
    }`,
}

const BREAKPOINTS = [
  { key: 'xs', value: '30rem', approx: '≥ 480px' },
  { key: 'sm', value: '48rem', approx: '≥ 768px' },
  { key: 'md', value: '64rem', approx: '≥ 1024px' },
  { key: 'lg', value: '67rem', approx: '≥ 1072px' },
  { key: 'xl', value: '78.125rem', approx: '≥ 1250px' },
]
</script>

<template>
  <section
    id="getting-started"
    class="section"
    data-section
  >
    <div class="section-header">
      <p class="eyebrow">Getting Started</p>
      <h2>Pick your flavor</h2>
      <p>
        Two options. 
        <br> Use it as-is with CSS, or go deeper with Sass. 
        <br> Either way, you get the same tokens.
      </p>
    </div>

    <!-- Installation -->
    <div class="subsection">
      <h3>
        {{ INSTALLATION.title }}
      </h3>

      <p class="subsection-description">
        {{ INSTALLATION.description }}
      </p>

      <div class="code-variants">
        <div>
          <p class="variant-label">Using pnpm</p>

          <CodeBlock
            :code="INSTALLATION.code" 
            :filename="INSTALLATION.filename"
          />
        </div>
        
        <div>
          <p class="variant-label">Using npm</p>

          <CodeBlock
            :code="INSTALLATION_NPM.code"
            :filename="INSTALLATION_NPM.filename"
          />
        </div>
      </div>
    </div>

    <!-- CSS Path -->
    <div class="subsection">
      <h3>
        {{ CSS_PATH.title }}
      </h3>
      <p class="subsection-description">
        {{ CSS_PATH.description }}
      </p>

      <CodeBlock
        :code="CSS_PATH.code"
        :filename="CSS_PATH.filename"
      />
    </div>

    <!-- Sass Path -->
    <div class="subsection">
      <h3>
        {{ SASS_PATH.title }}
      </h3>
      <p class="subsection-description">
        {{ SASS_PATH.description }}
      </p>

      <CodeBlock
        :code="SASS_PATH.code"
        :filename="SASS_PATH.filename"
      />
    </div>

    <!-- Breakpoint Reference -->
    <div class="subsection">
      <h3>Responsive Breakpoints</h3>
      <p class="subsection-description">
        Use with the 
          <code class="subsection-description__code">
            @include ps.breakpoint-up()
          </code> 
        mixin
      </p>

      <div class="breakpoints-table">
        <div class="table-header">
          <span>Key</span>
          <span>CSS Value</span>
          <span>Approximate Target</span>
        </div>

        <div
          v-for="bp in BREAKPOINTS"
          :key="bp.key"
          class="table-row"
        >
          <code class="key">
            {{ bp.key }}
          </code>
          <code class="value">
            {{ bp.value }}
          </code>
          <span class="approx">
            {{ bp.approx }}
          </span>
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

    &__code {
      display: inline-flex;
    }
  }
}

.code-variants {
  display: grid;
  gap: var(--space-6);

  @include ps.breakpoint-up('md') {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }

  .variant-label {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-muted);
  }
}

.breakpoints-table {
  display: grid;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-surface-muted);
}

.table-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-raised);
  border-bottom: 1px solid var(--color-border);
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-sm);
}

.table-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  .key {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .value {
    font-size: var(--text-xs);
    color: var(--color-text);
  }

  .approx {
    font-size: var(--text-xs);
    color: var(--color-text);
  }
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
