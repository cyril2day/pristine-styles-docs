export type NavItem = {
  id: string
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'getting-started', label: 'Getting Started', href: '#getting-started' },
  { id: 'colors', label: 'Colors', href: '#colors' },
  { id: 'dark-mode', label: 'Dark Mode', href: '#dark-mode' },
  { id: 'typography', label: 'Typography', href: '#typography' },
  { id: 'spacing', label: 'Spacing', href: '#spacing' },
  { id: 'effects', label: 'Effects', href: '#effects' },
  { id: 'composition', label: 'Composition', href: '#composition' },
]
