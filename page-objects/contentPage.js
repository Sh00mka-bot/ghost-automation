const HelperBase = require("./HelperBase");
const {expect} = require("@playwright/test");
const {monitorEventLoopDelay} = require("node:perf_hooks");


class ContentPage extends HelperBase {
    constructor(page) {
        super(page);
    }



    async createNewContent(data){

        const create = this.page.locator('[data-test-new-post-button]', { hasText: data })
        await expect(create).toBeVisible();
        await create.click();
    }


    async manageNewContent( action ){

        const manageButton = this.page.getByRole('button', { name: action });
        await expect(manageButton).toBeVisible();
        await manageButton.click();

    }

    async fillTitleAndBody(title, body){
        const postTitle = this.page.locator('[data-test-editor-title-input]');
        await expect(postTitle).toBeVisible();
        await postTitle.fill(title);

        const editor = this.page.getByRole('textbox').nth(1);
        await expect(editor).toBeVisible();
        await editor.fill(body);
    }


    async locatorPublishedContent(){
        const buttonPublish = this.page.locator('[data-test-button="continue"]');
        await expect(buttonPublish).toBeVisible();
        await buttonPublish.click();

        const confirm = this.page.locator('[data-test-button="confirm-publish"]');
        await expect(confirm).toBeVisible();
        await confirm.click({ force: true });

        return this.page.locator('[data-test-publish-flow="complete"]')
            .locator('.modal-body h2');
    }
}

module.exports = ContentPage;
