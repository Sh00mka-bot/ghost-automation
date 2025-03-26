import {test, expect} from '@playwright/test'
import logger from "../../utils/logger";
const loginData = require('./data/login-data.json')
const {endpoint} = require('../../config/env-loader');
const PageManager = require("../../page-objects/pageManager")


test.describe( "Auth Regression Test Suite",()=>{

    loginData.forEach(data => {
        test(`Use email as ${data.email}, and password as ${data.password}`,
            async({page, context}) =>{

            await context.clearCookies();
            const pm = new PageManager(page);

            logger.info("Going to Admin Page ");
            await page.goto(endpoint("ghost/signin/"));

            await pm.getLoginPage().loginFormFillSubmit(data.email, data.password);

            await expect(page).toHaveURL(endpoint("ghost/#/signin/"))

        })
    })
    test('Login as Owner of the Page Successfully', async({page, context}) =>{
        await context.clearCookies();
        const pm = new PageManager(page);

        logger.info("Going to Admin Page ");
        await page.goto(endpoint("ghost/signin/"));

        await pm.getLoginPage().loginFormFillSubmit("admin@test.com","Secure0_psswd");

        const dashboard = await page.locator(".gh-dashboard .gh-canvas-title");
        await expect(dashboard).toBeVisible();
        await expect(dashboard).toContainText("You’re all set.");
    })




})
