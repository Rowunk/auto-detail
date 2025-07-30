// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['<rootDir>/src/**/*.{spec,test}.{ts,tsx}']
};

// now the export is also typed
export default config;
