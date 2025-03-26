import {test, expect} from '@playwright/test'
import logger from "../../utils/logger";
import {endpoint} from "../../config/env-loader";
const PageManager = require("../../page-objects/pageManager")


test.describe("Verify functionalities of Admin dashboard", ()=>{

    test('Navigate to View Site and verify it shows the site', async({page}) =>{
        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("site");

        const siteFrame = await page.frameLocator('iframe.site-frame').locator(".gh-navigation-brand")
        await expect(siteFrame).toContainText("Test Ghost Blog");
    })

    test("Navigate to Explore and verify it opened", async({page})=>{

        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("explore");

        const siteFrame = await page.frameLocator('iframe.explore-frame');
        const exploreHeader = siteFrame.locator('.flex.flex-nowrap.justify-start h3');

        await expect(exploreHeader).toContainText("Explore");

    });

    test("Navigate to Post and verify", async({page})=>{

        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("posts");
        const postName = await page.locator('[data-test-screen-title]')
        await expect(postName).toContainText("Posts");
    });

    test("Navigate to Pages and verify it opened", async({page})=>{
        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("pages");
        const postName = await page.locator('[data-test-screen-title]')
        await expect(postName).toContainText("Pages");
    });

    test("Navigate to Tags and verify it opened", async({page})=>{
        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("tags");
        const postName = await page.locator('[data-test-screen-title]')
        await expect(postName).toContainText("Tags");
    });

    test("Navigate to Members and verify it opened", async({page})=>{
        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("members");
        const postName = await page.locator('[data-test-screen-title]')
        await expect(postName).toContainText("Members");
    });

    test("Navigate back to Dashboard and verify it opened", async({page})=>{

        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("dashboard");
        const postName = await page.locator('.gh-onboarding-header h2')
        await expect(postName).toContainText("You’re all set.");

    });

})





