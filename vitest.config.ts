import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: './',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json-summary', 'json']
      }
    }
  })
)
