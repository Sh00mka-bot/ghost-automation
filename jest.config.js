module.exports = {
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/tests/api/**/*.test.js"],
  testTimeout: 30000,
  setupFilesAfterEnv: [],
  watchPathIgnorePatterns: ["token_cache.json"]
};
