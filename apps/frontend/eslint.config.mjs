import { baseConfig } from '@shop-co/eslint-config'
import eslintPluginNext from '@next/eslint-plugin-next'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  { ignores: ['.next', 'tailwind.config.ts'] },
  { plugins: { '@next/next': eslintPluginNext } },
]
