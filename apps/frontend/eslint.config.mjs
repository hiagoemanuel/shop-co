import { baseConfig } from '@shop-co/eslint-config'

import eslintPluginNext from '@next/eslint-plugin-next'
import eslintPluginQuery from '@tanstack/eslint-plugin-query'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  { ignores: ['.next', 'tailwind.config.ts'] },
  {
    plugins: {
      '@next/next': eslintPluginNext,
      '@tanstack/query': eslintPluginQuery,
    },
  },
]
