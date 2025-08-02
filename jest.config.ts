// jest.config.ts
import type { Config } from '@jest/types';

/**
 * Jest configuration in ESM format.
 */
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};

export default config;
