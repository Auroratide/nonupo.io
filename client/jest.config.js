const path = require('path')

module.exports = {
  preset: 'ts-jest',
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
  moduleNameMapper: {
    '^@\/(.*)': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.svelte$': ['svelte-jester', {
      preprocess: true
    }]
  },
  setupFilesAfterEnv: [ path.join(__dirname, 'src', 'testing', 'setup.ts') ],
  modulePathIgnorePatterns: ['<rootDir>/scripts'],
};
