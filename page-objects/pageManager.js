const NavigationPage =  require("./navigatePage")
const ContentPage = require("./contentPage")
const LoginPage = require("./loginPage")
const HelperBase = require ("./helperBase")

class PageManager extends HelperBase {

    #page
    #navigationPage
    #contentPage
    #loginPage

    constructor(page) {
        super();
        this.#page = page;
        this.#navigationPage = new NavigationPage(this.#page)
        this.#contentPage = new ContentPage(this.#page)
        this.#loginPage = new LoginPage(this.#page)

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

    getLoginPage(){
        return this.#loginPage;
    }

}

module.exports = PageManager;
