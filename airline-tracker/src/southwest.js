const { Builder, By, until, Key, Actions } = require("selenium-WebDriver");
const assert = require("assert");

async function test() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.manage().window().fullscreen();

        await driver.get("https://www.southwest.com");
        await new Promise(resolve => setTimeout(resolve, 5000));
        // await driver.findElement(By.id("LandingAirBookingSearchForm_originationAirportCode")).clear();

        // await driver.findElement(By.id("LandingAirBookingSearchForm_originationAirportCode")).sendKeys("SAN");
        const origin = await driver.findElement(By.id("LandingAirBookingSearchForm_originationAirportCode"));
        await origin.click();
        await origin.sendKeys(Key.chord(Key.CONTROL, 'a'));
        await origin.sendKeys(Key.BACK_SPACE);
        await origin.sendKeys("SAN");

        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.actions().sendKeys(Key.ENTER).perform();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.findElement(By.id("LandingAirBookingSearchForm_destinationAirportCode")).sendKeys("SJC");
        await driver.actions().sendKeys(Key.ENTER).perform();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.actions().move({ x: 148, y: 561 }).click().perform();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.findElement(By.id,"LandingAirBookingSearchForm_departureDate").click();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.findElement(By.id,"calendar-71-2024-10-11").click();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.findElement(By.id,"calendar-74-2024-10-13").click();
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.findElement(By.id,"LandingAirBookingSearchForm_submit-button").click();

        const pageTitle = await driver.getTitle();

        console.log(pageTitle);

    } catch (error) {
        console.log('error', error);

    }
    finally {
        await driver.quit();
    }
}

test();