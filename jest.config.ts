module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/tests/**/*.(test|spect).(ts|js)'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/.coverage/',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }],
  },
  clearMocks: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/bin/'],
  extensionsToTreatAsEsm: ['.ts'],
}
