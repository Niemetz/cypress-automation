import { Given } from '@cucumber/cucumber'

Given('I am on the {string}', async function(pageId) {
        console.log(`I am on the ${pageId}`);
        await global.page.goto("http://localhost:3000/");
    }
)