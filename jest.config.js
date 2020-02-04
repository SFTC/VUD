module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  "collectCoverage": true,
  "collectCoverageFrom": ["packages/**/*vue", "!**/node_modules/**"],
}