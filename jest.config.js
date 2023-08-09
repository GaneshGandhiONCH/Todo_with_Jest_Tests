module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
  ],
  moduleNameMapper: {
    "/.+\\.(css|sass|scss|png|jpg)$": "identity-obj-proxy",
  },
};
