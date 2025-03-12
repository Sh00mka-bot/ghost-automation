module.exports = {
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/tests/api/**/*.test.js"],
  testTimeout: 30000,
  watchPathIgnorePatterns: ["token_cache.json"]
};
