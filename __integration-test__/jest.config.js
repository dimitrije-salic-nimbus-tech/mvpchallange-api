/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    clearMocks: true,
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/GlobalSetup.ts'],
    testEnvironment: 'node',
    testRegex: '__integration-test__/.*.spec.ts$',
    transformIgnorePatterns: [],
    verbose: true,
};
