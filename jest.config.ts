// jest.config.js
/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',                // ← now installed
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};
