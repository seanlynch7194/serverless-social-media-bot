module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts?$': '<rootDir>/node_modules/babel-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverageFrom: ['src/**/*.{ts,js,tsx,jsx}'],
    preset: "@shelf/jest-dynamodb"
}
