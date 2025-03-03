const { chromium } = require("playwright");

const logger = require("../utils/logger");

async function setupGhostAdmin() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  logger.info("Going to Admin Page ");
  await page.goto("http://localhost:2368/ghost/");

  logger.info("Creating profile");
  const form = page.locator(".form-group");
  await form.getByLabel("Site title").fill("Test Ghost Blog");
  await form.getByLabel("Full name").fill("Test Admin");
  await form.getByLabel("Email address").fill("admin@test.com");
  await form.getByLabel("Password").fill("Secure0_psswd");

  await page
    .getByRole("button", { name: "Create account & start publishing →" })
    .click();

  await page.waitForTimeout(1000);

  logger.info("Admin profile has been set up");
  await browser.close();
}

setupGhostAdmin();
