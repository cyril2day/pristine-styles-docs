<script setup lang="ts">
import TokenBadge from '@/components/ui/TokenBadge.vue'

type Props = {
  name: string
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Unknown',
})
</script>

<template>
  <div class="color-swatch">
    <span
      class="swatch-circle"
      :style="`background-color: var(${name})`"
    />

    <span class="swatch-label">
      {{ label }}
    </span>

    <TokenBadge
      class="swatch-token" 
      :name="name"
    />
  </div>
</template>

<style scoped lang="scss">
@use 'pristine-styles/scss' as ps;

.color-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.swatch-circle {
  display: block;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.swatch-label {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  text-align: center;
}

.swatch-token {
  min-width: 0;
  max-width: 100%;
  width: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
