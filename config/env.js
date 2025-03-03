
const dotenv = require("dotenv");
const path = require("path");

const envPath = path.resolve(__dirname, `../.env`);
dotenv.config({ path: envPath });

console.log(`------- Loaded environment variables from: ${envPath}`);


const requiredEnvVars = ["BASE_URL", "ADMIN_API_KEY"];

const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
}

module.exports = {
    BASE_URL: process.env.BASE_URL || "http://localhost:2368",
    ADMIN_API_KEY: process.env.ADMIN_API_KEY,
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
};