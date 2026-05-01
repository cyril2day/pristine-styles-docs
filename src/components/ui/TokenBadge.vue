<script setup lang="ts">
type Props = {
  name: string
}

defineProps<Props>()
</script>

<template>
  <code class="token-badge">
    {{ name }}
  </code>
</template>

<style scoped lang="scss">
@use 'pristine-styles/scss' as ps;

.token-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 1.75rem;
  padding: 0 0.6rem;
  font-family: var(--font-family-mono);
  font-size: var(--text-xs);
  line-height: 1;
  background-color: var(--color-surface-raised);
  color: var(--color-text);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  white-space: nowrap;
}
</style>
