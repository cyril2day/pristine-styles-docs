<script setup lang="ts">
import CopyButton from '@/components/ui/CopyButton.vue'

type Props = {
  code: string
  filename?: string
}

defineProps<Props>()
</script>

<template>
  <div class="code-block">
    <div
      v-if="filename"
      class="code-header"
    >
      <span class="code-filename">
        {{ filename }}
      </span>
    </div>

    <pre class="code-content">
      <code v-text="code"></code>
    </pre>

    <div class="code-footer">
      <CopyButton
        :text="code"
        label="Copy code"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../pristine-styles/scss/index' as ps;

.code-block {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.code-header {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-inset);
  border-bottom: 1px solid var(--color-border);
}

.code-filename {
  font-family: var(--font-family-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-semibold);
}

.code-content {
  flex: 1;
  margin: 0;
  padding: var(--space-4);
  overflow-x: auto;
  font-family: var(--font-family-mono);
  font-size: var(--text-xs);
  line-height: var(--line-height-relaxed);
  color: var(--color-text);
  white-space: pre;

  code {
    all: inherit;
  }
}

.code-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-inset);
  border-top: 1px solid var(--color-border);
}
</style>
