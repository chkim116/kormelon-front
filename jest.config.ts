import nextJest from 'next/jest';

const createJestConfig = nextJest({
	dir: './',
});

const jestConfig = {
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
export default createJestConfig(jestConfig);
