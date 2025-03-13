import {Page} from "@playwright/test";
const HelperBase = require("./HelperBase");

class NavigationPage extends HelperBase{
    constructor(page) {
        super(page);
    }


    /**
     * @param page is to navigate to:
     * - dashboard
     * - site
     * - posts
     * - pages
     * - members
     * @returns {Promise<void>}
     */

    async menuAndOpen(page){

        const menu = this.page.locator('[data-test-nav-menu="main"]');
        const posts = menu.locator(`[data-test-nav="${page}"]`);
        await posts.click();
    }
}

module.exports = NavigationPage;
