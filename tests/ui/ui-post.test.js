import {test, expect, mergeTests} from "@playwright/test";
import apiRequest from "../../utils/api-utils";
const PageManager =  require("../../page-objects/pageManager")



test.describe("Log in as Admin, create post, draft, schedule, post and verify", () => {

    test(" Create Post and check in review", async({page}) =>{
        const pm = new PageManager(page);
        await page.goto("http://localhost:2368/ghost/dashboard/");
        await pm.getNavigationMenu().menuAndOpen("posts");

        await pm.getContentPageOptions().createNewContent('New post');

        let title = 'This is Preview Test';
        await pm.getContentPageOptions().fillTitleAndBody(title, 'some body');
        await pm.getContentPageOptions().manageNewContent('Preview');

        const siteFrame = await page.frameLocator('iframe.gh-pe-iframe');
        const titleBe = await siteFrame.locator('.gh-article-header.gh-canvas h1');

        await expect(titleBe).toContainText(title);

        await pm.getContentPageOptions().erase('posts')
    })


    test(" Create Post and Publish, verify", async({page}) =>{
        const pm = new PageManager(page);
        await page.goto("http://localhost:2368/ghost/dashboard/");
        await pm.getNavigationMenu().menuAndOpen("posts");

        await pm.getContentPageOptions().createNewContent('New post');

        let title = 'This is new Title';
        await pm.getContentPageOptions().fillTitleAndBody(title, 'some body');

        await pm.getContentPageOptions().manageNewContent('Publish');

        const published = await pm.getContentPageOptions().locatorPublishedContent();

        await expect(published).toContainText(title)

        await pm.getContentPageOptions().erase('posts')

    })









})
