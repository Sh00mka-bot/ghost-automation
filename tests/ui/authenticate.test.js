import {test, expect} from '@playwright/test'
import logger from "../../utils/logger";



test('Login as Owner of the Page', async({page}) =>{

    logger.info("Going to Admin Page ");
    await page.goto("http://localhost:2368/ghost/signin/");

    const form = page.locator(".form-group");
    await form.getByLabel("Email address").fill("admin@test.com");

    await form.getByLabel("Password").fill("Secure0_psswd");

    await page
        .getByRole("button", {name: "Sign in"}).click();

    const dashboard = await page.locator(".gh-dashboard .gh-canvas-title");
    await expect(dashboard).toBeVisible();
    await expect(dashboard).toContainText("Let’s get started!");

})
