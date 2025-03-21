import {test, expect, mergeTests} from "@playwright/test";
import apiRequest from "../../utils/api-utils";
const PageManager =  require("../../page-objects/pageManager")



test.describe("Log in as Admin, create post, draft, schedule, post and verify", () => {

    test(" Create Post and check in review", async({page}) =>{
        const pm = new PageManager(page);
        await page.goto("http://localhost:2368/ghost/dashboard/");
        await pm.getNavigationMenu().menuAndOpen("posts");

        await page.locator('[data-test-link="write-a-new-post"]').click();

        const postTitle = page.locator('[data-test-editor-title-input]');
        await expect(postTitle).toBeVisible();
        await postTitle.fill("My first Automation Post");

        const editor = page.getByRole('textbox').nth(1);
        await expect(editor).toBeVisible();
        await editor.fill('This is the blog post body.');


        const previewButton = page.getByRole('button', { name: 'Preview' });
        await expect(previewButton).toBeVisible();
        await previewButton.click();

        const siteFrame = await page.frameLocator('iframe.gh-pe-iframe');
        const titleBe = await siteFrame.locator('.gh-article-header.gh-canvas h1');

        await expect(titleBe).toContainText('My first Automation Post');


        const getPost = await apiRequest.get('/ghost/api/admin/posts/');
        const postId = getPost.body.posts[0].id;
        const deleteByID = await apiRequest.delete(
            `/ghost/api/admin/posts/${postId}/`
        );
        expect(deleteByID.status).toEqual(204);

    })



})
