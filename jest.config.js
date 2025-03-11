module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/api/**/*.test.js"],
  testTimeout: 30000,
  watchPathIgnorePatterns: ["token_cache.json"]
};