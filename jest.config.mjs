export default {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
