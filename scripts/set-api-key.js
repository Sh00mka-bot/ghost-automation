const fs = require("fs");
const logger = require("../utils/logger")
const path = require("path");

const ENV_FILE_PATH = path.resolve(__dirname, "../.env");

const apiKey = process.argv[2];

if (!apiKey || !apiKey.includes(":")) {
  logger.error(
    "Invalid API Key. Usage: npm run apik-key your-api-id:your-api-secret"
  );
  process.exit(1);
}

let envContent = fs.existsSync(ENV_FILE_PATH)
  ? fs.readFileSync(ENV_FILE_PATH, "utf8")
  : "";

envContent = envContent.replace(/^ADMIN_API_KEY=.*$/gm, "");
envContent += `\nADMIN_API_KEY=${apiKey}\n`;
fs.writeFileSync(ENV_FILE_PATH, envContent.trim() + "\n", "utf8");

logger.info(`Updated .env with new Admin API Key: ${apiKey}`);
