// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // === Base settings ===
  preset: 'ts-jest',                 // compile TS/TSX via ts-jest
  testEnvironment: 'jsdom',          // simulate browser APIs
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts'
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

  // === Coverage collection ===
  collectCoverage: true,                           // enable coverage
  coverageDirectory: '<rootDir>/coverage',        // output folder
  coverageReporters: ['text', 'lcov', 'html'],     // formats: terminal, lcov, HTML

  // specify which source files to instrument:
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',    // include all app code…
    '!src/**/*.d.ts',              // …but exclude type declarations
    '!src/**/__tests__/**',        // …and test files
    '!src/**/*.mock.{ts,tsx}',     // …and manual mocks
    '!src/**/index.{ts,tsx,js,jsx}'// …and barrel entry-points (if desired)
  ],

  // (Optional) Enforce minimum coverage thresholds:
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines:     90,
      statements:90
    },
    // per-file overrides, e.g.:
    // "./src/components/": { branches: 70 }
  }
};

export default config;
