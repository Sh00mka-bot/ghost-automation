const createAdmin = require("./testingtoken");

(async () => {
  console.log("🔄 Running createAdmin test...");
  await createAdmin();
  console.log("✅ Test completed.");
})();
