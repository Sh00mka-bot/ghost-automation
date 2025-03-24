const NavigationPage =  require("./navigatePage")
const ContentPage = require("./contentPage")
import {Page} from "@playwright/test";
const HelperBase = require ("./helperBase")

class PageManager extends HelperBase {

    #page
    #navigationPage
    #contentPage

    constructor(page) {
        super();
        this.#page = page;
        this.#navigationPage = new NavigationPage(this.#page)
        this.#contentPage = new ContentPage(this.#page)

        Object.defineProperty(this, "#page", { writable: false });
        Object.defineProperty(this, "#navigationPage", { writable: false });
        Object.defineProperty(this, this.#contentPage,{writable: false})
    }

    getNavigationMenu(){
        return this.#navigationPage;
    }

    getContentPageOptions(){
        return this.#contentPage;
    }

}

module.exports = PageManager;
