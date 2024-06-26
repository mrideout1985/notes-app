module.exports = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/**/*.d.ts',
		'!src/mocks/**',
	],
	coveragePathIgnorePatterns: [],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	testEnvironment: 'jsdom',
	modulePaths: ['<rootDir>/src'],
	transform: {
		'^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
		'^.+\\.css$': '<rootDir>/src/cssTransform.ts',
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
		'^.+\\.module\\.(css|sass|scss)$',
	],
	modulePaths: ['<rootDir>/src'],
	moduleNameMapper: {
		'^react-native$': 'react-native-web',
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
	},
	moduleFileExtensions: [
		// Place tsx and ts to beginning as suggestion from Jest team
		// https://jestjs.io/docs/configuration#modulefileextensions-arraystring
		'tsx',
		'ts',
		'web.js',
		'js',
		'web.ts',
		'web.tsx',
		'json',
		'web.jsx',
		'jsx',
		'node',
	],
	unmockedModulePathPatterns: [
		'<rootDir>/node_modules/react',
		'<rootDir>/node_modules/fbjs',
	],

	resetMocks: true,
}
