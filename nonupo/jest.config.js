const path = require('path')

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@\/(.*)': '<rootDir>/examples/$1'
  },
}
