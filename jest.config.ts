module.exports = {
  testMatch: ['<rootDir>/src/test/**/*.(test|spect).(ts|js)'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/bin/'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/.coverage/',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  clearMocks: true,
  testEnvironment: 'node',
}
