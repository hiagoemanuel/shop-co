import { baseConfig } from '@shop-co/eslint-config'

/** @type {import("eslint").Linter.Config[]} */
export default [...baseConfig, { ignores: ['dist'] }]
