const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");
require("dotenv").config();

class TokenManager {
  static TOKEN_CACHE = path.join(__dirname, "token_cache.json");

  static getToken() {
    const { token, expiryTime } = this.loadToken();
    const now = Math.floor(Date.now() / 1000);

    if (token && now < expiryTime - 30) {
      
      logger.info("Using cached token");
      return token;
    }

    return this.generateToken();
  }

  static generateToken() {
    const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

    if (!ADMIN_API_KEY || !ADMIN_API_KEY.includes(":")) {
      throw new Error("Missing or invalid ADMIN_API_KEY in .env file.");
    }

    const [id, secret] = ADMIN_API_KEY.split(":");

    const expiresIn = 300; //5m
    const token = jwt.sign({}, Buffer.from(secret, "hex"), {
      keyid: id,
      algorithm: "HS256",
      expiresIn,
      audience: "/admin/",
    });

    const expiryTime = Math.floor(Date.now() / 1000) + expiresIn;
    this.saveToken(token, expiryTime);

    logger.info("New token generated!");
    return token;
  }

  static saveToken(token, expiryTime) {
    fs.writeFileSync(this.TOKEN_CACHE, JSON.stringify({ token, expiryTime }));
  }

  static loadToken() {
    try {
      return fs.existsSync(this.TOKEN_CACHE)
        ? JSON.parse(fs.readFileSync(this.TOKEN_CACHE, "utf-8"))
        : {};
    } catch {
      return {};
    }
  }
}

module.exports = TokenManager;
