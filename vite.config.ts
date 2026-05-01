import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repoRoot = resolve(process.cwd())
const docsSourceDir = resolve(repoRoot)
const docsOutputDir = resolve(repoRoot, 'dist')

export default defineConfig({
  root: docsSourceDir,
  base: './',
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(repoRoot, 'src') },
      { find: /pristine-styles\/scss\/index(\.scss)?$/, replacement: 'pristine-styles/scss' }
    ]
  },
  server: {
    fs: {
      allow: [repoRoot]
    }
  },
  build: {
    outDir: docsOutputDir,
    emptyOutDir: true
  }
})
