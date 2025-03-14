import {chromium, expect} from "@playwright/test";
import logger from "./utils/logger";

async function globalSetup() {

    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    logger.info("Global Auth set up running ");
    await page.goto("http://localhost:2368/ghost/signin/");

    const form = page.locator(".form-group");
    await form.getByLabel("Email address").fill("admin@test.com");
    await form.getByLabel("Password").fill("Secure0_psswd");
    await page.getByRole("button", {name: "Sign in"}).click();
    const dashboard = await page.locator(".gh-dashboard .gh-canvas-title");
    await expect(dashboard).toBeVisible();
    await expect(dashboard).toContainText("You’re all set.");

    await page.context().storageState({path: "./AdminLogin.json"});

    await browser.close();
}

module.exports = globalSetup;
