import {chromium, expect} from "@playwright/test";
import logger from "./utils/logger";
import {endpoint} from "./config/env-loader";
const PageManager = require("./page-objects/pageManager")

async function globalSetup() {


    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    const pm = new PageManager(page);

    logger.info("Global Auth set up running ");
    await page.goto(endpoint("ghost/signin/"));

    await pm.getLoginPage().loginFormFillSubmit("admin@test.com","Secure0_psswd")

    const dashboard = await page.locator(".gh-dashboard .gh-canvas-title");
    await expect(dashboard).toBeVisible();
    await expect(dashboard).toContainText("You’re all set.");

    await page.context().storageState({path: "./AdminLogin.json"});

    await browser.close();
}

module.exports = globalSetup;
