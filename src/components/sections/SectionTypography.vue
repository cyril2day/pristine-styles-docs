<script setup lang="ts">
import TokenBadge from '@/components/ui/TokenBadge.vue'

type TypeSize = {
  name: string
  token: string
}

type FontFamily = {
  name: string
  token: string
  sample: string
}

type FontWeight = {
  name: string
  weight: number
}

type LineHeightOption = {
  name: string
  token: string
}

type LetterSpacingOption = {
  name: string
  token: string
}

const TYPE_SCALE: TypeSize[] = [
  { name: 'Extra Small', token: '--text-xs' },
  { name: 'Small', token: '--text-sm' },
  { name: 'Base', token: '--text-base' },
  { name: 'Large', token: '--text-lg' },
  { name: 'Extra Large', token: '--text-xl' },
  { name: '2XL', token: '--text-2xl' },
  { name: '3XL', token: '--text-3xl' },
  { name: '4XL', token: '--text-4xl' },
  { name: '5XL', token: '--text-5xl' },
]

const FONT_FAMILIES: FontFamily[] = [
  {
    name: 'Sans',
    token: '--font-family-sans',
    sample: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Monospace',
    token: '--font-family-mono',
    sample: 'const pristine = true;',
  },
  {
    name: 'Serif',
    token: '--font-family-serif',
    sample: 'Elegance in typography',
  },
]

const FONT_WEIGHTS: FontWeight[] = [
  { name: 'Light', weight: 300 },
  { name: 'Regular', weight: 400 },
  { name: 'Medium', weight: 500 },
  { name: 'Semibold', weight: 600 },
  { name: 'Bold', weight: 700 },
  { name: 'Extrabold', weight: 800 },
  { name: 'Black', weight: 900 },
]

const LINE_HEIGHTS: LineHeightOption[] = [
  { name: 'None', token: '--line-height-none' },
  { name: 'Tight', token: '--line-height-tight' },
  { name: 'Snug', token: '--line-height-snug' },
  { name: 'Normal', token: '--line-height-normal' },
  { name: 'Relaxed', token: '--line-height-relaxed' },
  { name: 'Loose', token: '--line-height-loose' },
]

const LETTER_SPACINGS: LetterSpacingOption[] = [
  { name: 'Tighter', token: '--letter-spacing-tighter' },
  { name: 'Tight', token: '--letter-spacing-tight' },
  { name: 'Normal', token: '--letter-spacing-normal' },
  { name: 'Wide', token: '--letter-spacing-wide' },
  { name: 'Wider', token: '--letter-spacing-wider' },
  { name: 'Widest', token: '--letter-spacing-widest' },
]
</script>

<template>
  <section id="typography" class="section" data-section>
    <div class="section-header">
      <p class="eyebrow">Typography</p>
      <h2>Scales, families, and weights</h2>

      <p>
        A responsive type scale that adjusts depending on screen size. 
        Plus font families, weights, and spacing options for consistent typography.
      </p>
    </div>

    <!-- Type Scale -->
    <div class="subsection">
      <h3>Type Scale</h3>
      <p class="subsection-description">9 sizes, from extra small to 5XL</p>

      <div class="type-scale-list">
        <div
          v-for="size in TYPE_SCALE"
          :key="size.token"
          class="type-row"
        >
          <span class="type-name">
            {{ size.name }}
          </span>
          <p
            class="sample-text"
            :style="{ fontSize: `var(${size.token})` }"
          >Pristine Styles</p>

          <TokenBadge :name="size.token" />
        </div>
      </div>
    </div>

    <!-- Font Families -->
    <div class="subsection">
      <h3>Font Families</h3>
      <p class="subsection-description">
        Sans, monospace, and serif stacks
      </p>

      <div class="font-families-grid">
        <div
          v-for="family in FONT_FAMILIES"
          :key="family.token"
          class="font-family-card panel"
        >
          <p class="font-category">
            {{ family.name }}
          </p>

          <p
            class="font-sample"
            :style="{ fontFamily: `var(${family.token})` }"
          >
            {{ family.sample }}
          </p>

          <TokenBadge class="font-category__token" :name="family.token" />
        </div>
      </div>
    </div>

    <!-- Font Weights -->
    <div class="subsection">
      <h3>Font Weights</h3>
      <p class="subsection-description">7 weight options for hierarchy and emphasis</p>

      <div class="weights-grid">
        <div
          v-for="weight in FONT_WEIGHTS"
          :key="weight.weight"
          class="weight-row"
        >
          <span class="weight-name">
            {{ weight.name }}
          </span>

          <p
            class="weight-sample"
            :style="{ fontWeight: weight.weight }"
          >Pristine Styles</p>

          <code class="weight-value">
            {{ weight.weight }}
          </code>
        </div>
      </div>
    </div>

    <!-- Line Heights & Letter Spacing -->
    <div class="subsection">
      <h3>Supporting Tokens</h3>
      <p class="subsection-description">
        Line height keeps text readable. Letter spacing is mostly for headings, labels, and display text.
      </p>

      <div class="supporting-grid">
        <div class="supporting-list">
          <div class="supporting-header">
            <h4>Line Heights</h4>
            <p>Use these to tune paragraph rhythm and compact UI text.</p>
          </div>

          <div class="type-scale-list">
            <div
              v-for="lh in LINE_HEIGHTS"
              :key="lh.token"
              class="type-row"
            >
              <span class="type-name">
                {{ lh.name }}
              </span>

              <p
                class="demo-sample"
                :style="{ lineHeight: `var(${lh.token})` }"
              >
                The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
              </p>

              <TokenBadge :name="lh.token" />
            </div>
          </div>
        </div>
        <div class="supporting-list">
          <div class="supporting-header">
            <h4>Letter Spacing</h4>
            <p>Use these sparingly, mostly on headings, tags, and all-caps labels.</p>
          </div>

          <div class="type-scale-list">
            <div
              v-for="ls in LETTER_SPACINGS" 
              :key="ls.token" 
              class="type-row"
            >
              <span class="type-name">
                {{ ls.name }}
              </span>

              <p
                class="demo-sample caps"
                :style="{ letterSpacing: `var(${ls.token})` }"
              >Pristine Styles</p>

              <TokenBadge :name="ls.token" />
            </div>
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

.type-scale-list {
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

.font-families-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.font-family-card {
  display: flex;
  flex-direction: column;

  .font-category {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);

    &__token {
      margin-top: auto;
    }
  }

  .font-sample {
    margin: 0 0 var(--space-3) 0;
    font-size: var(--text-lg);
    line-height: var(--line-height-relaxed);
  }
}

.font-info-callout {
  padding: var(--space-4);
  background-color: var(--color-surface-muted);
  border-left: 3px solid var(--color-blue);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  line-height: var(--line-height-relaxed);

  strong {
    display: block;
    margin-bottom: var(--space-1);
    color: var(--color-text);
  }

  code {
    background: none;
    padding: 0;
    color: var(--color-text-muted);
  }
}

.weights-grid {
  display: grid;
  gap: var(--space-3);
}

.weight-row {
  display: grid;
  grid-template-columns: 6rem 1fr 4rem;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3);
  background-color: var(--color-surface-muted);
  border-radius: var(--radius-md);

  .weight-name {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .weight-sample {
    margin: 0;
    font-size: var(--text-base);
    font-family: var(--font-family-sans);
  }

  .weight-value {
    text-align: right;
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }
}

.supporting-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}

.supporting-list {
  display: grid;
  gap: var(--space-3);
}

.supporting-header {
  display: grid;
  gap: var(--space-1);

  h4 {
    margin: 0;
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    letter-spacing: -0.01em;
  }

  p {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-base);
    line-height: var(--line-height-relaxed);
  }
}

.supporting-list .type-scale-list {
  gap: var(--space-3);
}

.supporting-list .type-row {
  .demo-sample {
    margin: 0;
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
    line-height: 1;
    max-width: 60ch;
  }

  .demo-sample.caps {
    text-transform: uppercase;
    font-weight: var(--font-weight-semibold);
    letter-spacing: inherit;
  }
}
</style>
