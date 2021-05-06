const path = require('path')

module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [ path.join(__dirname, 'examples', 'setup.ts') ],
  moduleNameMapper: {
    '^@\/(.*)': '<rootDir>/examples/$1'
  },
}
