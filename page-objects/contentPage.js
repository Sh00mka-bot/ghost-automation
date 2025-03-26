const HelperBase = require("./HelperBase");
const {expect} = require("@playwright/test");


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




    async publishContent() {
        const buttonPublish = this.page.locator('[data-test-button="continue"]');
        await buttonPublish.waitFor({ state: 'visible' });
        await buttonPublish.click();

        const confirm = this.page.locator('[data-test-button="confirm-publish"]');
        await confirm.waitFor({ state: 'visible' });
        await confirm.click({ force: true });

        const published = this.page
            .locator('[data-test-publish-flow="complete"]')
            .locator('.modal-body h2');

        await published.waitFor({ state: 'visible' });

        return published;
    }
}

module.exports = ContentPage;
