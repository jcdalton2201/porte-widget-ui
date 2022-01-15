
const puppeteer = require('puppeteer');
describe('Unit and Functional Tests for porte-widget-card-input',()=>{
    let browser = null;
    let page = null;
    let context = null;
    let target = null;
    beforeAll(async() => {
        browser = await puppeteer.launch({headless:false});
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
        page = await browser.newPage();
        await page.setBypassCSP(true);
        await page.goto('http://localhost:8080');
        await page.addScriptTag({path:'dist/porte-widget-core-ui.js'});

    });
    it('Test we can work',async()=>{

    });
});
