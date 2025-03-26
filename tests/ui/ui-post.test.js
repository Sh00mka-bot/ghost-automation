import {test, expect} from "@playwright/test";
import {endpoint} from "../../config/env-loader";
const PageManager =  require("../../page-objects/pageManager");

test.describe("Log in as Admin, create post, draft, schedule, post and verify", () => {

    test.beforeAll(async (page)=> {

        const pm = new PageManager();
        await pm.getContentPageOptions().cleanAllDataFrom("posts");

    });


    test(" Create Post and check in review", async({page}) =>{
        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("posts");

        await pm.getContentPageOptions().createNewContent('New post');

        let title = `This is the Preview Post ${Date.now()}`;
        await pm.getContentPageOptions().fillTitleAndBody(title, 'Some body');
        await pm.getContentPageOptions().manageNewContent('Preview');

        const siteFrame = await page.frameLocator('iframe.gh-pe-iframe');
        const titleBe = await siteFrame.locator('.gh-article-header.gh-canvas h1');

        await expect(titleBe).toBeVisible();
        await expect(titleBe).toContainText(title);

        await pm.getContentPageOptions().erase('posts')
    })


    test(" Create Post and Publish, verify", async({page}) =>{
        const pm = new PageManager(page);
        await page.goto(endpoint("ghost/dashboard/"));
        await pm.getNavigationMenu().menuAndOpen("posts");

        await pm.getContentPageOptions().createNewContent('New post');
        let title = `This is new Title ${Date.now()}`;
        await pm.getContentPageOptions().fillTitleAndBody(title, 'some body');

        await pm.getContentPageOptions().waitForPostToBeSaved();
        await page.waitForLoadState('networkidle');

        await pm.getContentPageOptions().manageNewContent('Publish');

        const published = await pm.getContentPageOptions().publishContent();
        await expect(published).toContainText(title);

        await pm.getContentPageOptions().erase('posts');

    })


test.describe("Schedule Post")






})
