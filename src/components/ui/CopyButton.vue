<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { Just, Nothing, isJust, type Maybe } from '@/effects/index'
import type { CopyState } from '@/domain/ui'
import { copyIdle, copySuccess, copyError } from '@/domain/ui'
import { writeTextToClipboard } from '@/effects/storage'

type Props = {
  text: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Copy',
})

const copyState = ref<CopyState>(copyIdle())
let timeoutId: Maybe<ReturnType<typeof setTimeout>> = Nothing()

const buttonText = computed(() => (copyState.value.status === 'copied' ? 'Copied!' : props.label))

/**
 * Handle copy using TaskEither effect system.
 * The writeTextToClipboard function returns a TaskEither that models both
 * the async nature and potential error.
 */
const handleCopy = async () => {
  // Convert TaskEither to Promise and handle success/error paths
  writeTextToClipboard(props.text)
    .fold(
      // Error path: set error state
      err => {
        copyState.value = copyError(err.message)
        console.error('Copy error:', err.kind, err.message)
      },
      // Success path: set success state and schedule reset
      () => {
        copyState.value = copySuccess()
        if (isJust(timeoutId)) clearTimeout(timeoutId.value)
        timeoutId = Just(
          setTimeout(() => {
            copyState.value = copyIdle()
          }, 2000)
        )
      }
    )
    .toPromise()
}

// Clean up timeout on unmount
onUnmounted(() => {
  if (isJust(timeoutId)) {
    clearTimeout(timeoutId.value)
  }
})
</script>

<template>
  <button
    type="button"
    class="copy-button"
    :class="{ 'is-copied': copyState.status === 'copied' }"
    @click="handleCopy"
  >
    {{ buttonText }}
  </button>
</template>

<style scoped lang="scss">
@use '../../pristine-styles/scss/index' as ps;

.copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  background-color: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  white-space: nowrap;

  &:hover {
    background-color: var(--color-surface);
    border-color: var(--color-border-strong);
    color: var(--color-link);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }

  &.is-copied {
    background-color: var(--color-blue);
    border-color: var(--color-blue);
    color: white;
  }
}
</style>
