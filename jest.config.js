const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/**
 * @see https://zenn.dev/miruoon_892/articles/e42e64fbb55137
 */
const customJestConfig = {
  globalSetup: '<rootDir>/jest.global-setup.ts',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    'hast-util-sanitize': '<rootDir>/__mocks__/mock.js',
    'rehype-parse': '<rootDir>/__mocks__/mock.js',
    'rehype-highlight': '<rootDir>/__mocks__/mock.js',
    'rehype-sanitize': '<rootDir>/__mocks__/mock.js',
    'rehype-stringify': '<rootDir>/__mocks__/mock.js',
    unified: '<rootDir>/__mocks__/mock.js',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
