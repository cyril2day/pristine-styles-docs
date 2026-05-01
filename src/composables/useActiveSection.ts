import { ref, readonly, onMounted, onUnmounted } from 'vue'
import { createActiveSectionTracker } from '@/effects/activeSectionTracker'

export type Section = {
  id: string
  title: string
}

export function useActiveSection() {
  const activeSection = ref<string>('getting-started')

  const setActiveSection = (sectionId: string) => {
    activeSection.value = sectionId
  }

  const tracker = createActiveSectionTracker({
    getSections: () => Array.from(document.querySelectorAll<HTMLElement>('[data-section]')),
    getActivationLine: () => window.innerHeight * 0.35,
    onSectionChange: setActiveSection,
  })

  onMounted(() => {
    tracker.start.run()
  })

  onUnmounted(() => {
    tracker.stop.run()
  })

  return {
    activeSection: readonly(activeSection),
  }
}
