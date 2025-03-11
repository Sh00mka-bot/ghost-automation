const request = require("supertest");
const logger = require("../utils/logger");
const { BASE_URL } = require("../config/env-loader");
const tokenManager = require("../services/admin/token-manager");


class ApiUtils {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async getAuthTokenHeader() {
    const token = await tokenManager.getToken();  
    return { Authorization: `Ghost ${token}`,};
  }

  async get(endpoint, params = {}) {
    return this.handleRequest(async () => {
      const headers = await this.getAuthTokenHeader();
      return request(this.baseURL)
        .get(endpoint)
        .query(params)
        .set(headers)
        .set("Content-Type", "application/json")
        .set("Accept-Version", "v5.110");
    });
  }


  async post(endpoint, data) {
    return this.handleRequest(async () =>{
      const headers = await this.getAuthTokenHeader();
      return request(this.baseURL)
      .post(endpoint)
      .send(data)
      .set(headers)
      .set("Content-Type", "application/json")
      .set("Accept-Version", "v5.110")
    }
    );
  }


  async put(endpoint, data, params = {}) {
    return this.handleRequest(async () => {
      const headers = await this.getAuthTokenHeader();
      return request(this.baseURL)
        .put(endpoint)
        .query(params)
        .send(data)
        .set(headers)
        .set("Content-Type", "application/json")
        .set("Accept-Version", "v5.110");
    });
  }

  async delete(endpoint, params = {}) {
    return this.handleRequest(async () => {
      const headers = await this.getAuthTokenHeader();
      return request(this.baseURL)
        .delete(endpoint)
        .query(params)
        .set(headers)
        .set("Content-Type", "application/json")
        .set("Accept-Version", "v5.110");
    });
  }

  async handleRequest(requestFunction) {
    try {
      const response = await requestFunction();
      logger.info(`[API RESPONSE] ${response.status}`, response.body);
      return { status: response.status, body: response.body };
    } catch (error) {
      logger.error(`[API ERROR] ${error.status} - ${error.response?.body?.errors?.[0]?.message || error.message}`);
      throw error;
    }
  }
}

module.exports = new ApiUtils();