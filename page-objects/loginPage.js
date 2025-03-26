import {test, expect} from "@playwright/test";
const HelperBase = require("./helperBase");

class LoginPage extends HelperBase{
    constructor(page) {
        super(page);
    }

    async loginFormFillSubmit(email, password){
        const form = this.page.locator(".form-group");
        await form.getByLabel("Email address").fill(email);
        await form.getByLabel("Password").fill(password);
        await this.page.getByRole("button", {name: "Sign in"}).click();
    }
}

module.exports = LoginPage;
