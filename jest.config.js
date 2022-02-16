module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testTimeout: 10000,
  preset: 'ts-jest',
  testEnvironment: 'node',
  // We use a custom reporter for logging so don't use verbose.
  verbose: true,
};
