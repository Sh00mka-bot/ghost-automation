const fs =require("fs");
const logger = require("../utils/logger")
const path = require("path");
const { log } = require("console");

const ENV_FILE_PATH = path.resolve(__dirname, "../.env");

const envVariables = `
BASE_URL=http://localhost:2368
LOG_LEVEL=debug
ADMIN_API_KEY=
`;


if(!fs.existsSync(ENV_FILE_PATH)){
    fs.writeFileSync(ENV_FILE_PATH, envVariables.trim() + "\n", "utf-8");
    logger.info(".env file created")
} else {
    logger.warn(".env exist already")
}