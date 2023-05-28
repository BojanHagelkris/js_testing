"use strict";
require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, Key, until} = require('selenium-webdriver');
const {assert, expect} = require('chai');

/*
    const chai = require('chai');
    const assert = chai.assert;
    const expect = chai.expect;
 */

describe('Selenium tests', function () {
    let driver;

    before(function () {
     driver = new  webdriver.Builder().forBrowser('chrome').build();
    });

    after( async function() {
        await driver.quit();
    });

    it('Opens Qa.rs website', async function() {
        await driver.get('https://qa.rs');
        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.contain('QA.rs');
        assert.equal(pageTitle, 'Edukacija za QA testere - QA.rs');
    });

    it('Open Google website', async function(){
        await driver.get('https://google.com/');
        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.contain('Google');
    });

    // Dodao sam test na kojem prihvata Cookies
    it('Accepts Google cookies', async function() {
       const acceptCookies = await driver.findElement(By.id('L2AGLb'));
       acceptCookies.click();

    })

    it('Preform a search on Google', async function () {
        expect(await driver.getTitle()).to.contain('Google');
        const inputSearch = await driver.findElement(By.name('q'));
        inputSearch.click();
        inputSearch.sendKeys("qa.rs ", Key.ENTER);

        await driver.wait(until.elementLocated(By.id('search')));
        expect(await driver.getTitle()).to.contain('qa.rs');

    });

});