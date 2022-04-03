import {BeforeAll, Before, AfterAll, After, ITestStepHookParameter} from "@cucumber/cucumber";
const {chromium} = require("playwright");
//import {chromium, Page, Browser} from "playwright";

BeforeAll(async() => {
    global.browser = await chromium.launch({
        headless:false,
        channel: "chrome",
        viewport: { width: 800, height: 720 },
        video: 'on-first-retry',
    })
});

AfterAll(async() => {
    await global.browser.close();
});

Before(async(scenario) => {
    global.context = await global.browser.newContext( {
        recordVideo: {
            dir: './reports/videos/' + scenario.pickle.name
        }
    });
    global.page = await global.context.newPage();
});

After(async(scenario) => {
    const  scenarioStatus = scenario.result?.status;
    if (scenarioStatus === 'FAILED') {
        await global.page.screenshot({
            path: './reports/screenshot/${scenario.pickle.name}.png'
        })
    }
    await global.page.close()
});

