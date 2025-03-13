const NavigationPage =  require("./navigatePage")
import {Page} from "@playwright/test";
const HelperBase = require ("./helperBase")

class PageManager extends HelperBase {

    #page
    #navigationPage

    constructor(page) {
        super();
        this.#page = page;
        this.#navigationPage = new NavigationPage(this.#page)

        Object.defineProperty(this, "#page", { writable: false });
        Object.defineProperty(this, "#navigationPage", { writable: false });
    }

    getNavigationMenu(){
        return this.#navigationPage;
    }

}

module.exports = PageManager;
