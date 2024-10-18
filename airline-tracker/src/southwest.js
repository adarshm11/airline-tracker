const { Builder, By, until, Key, Actions } = require("selenium-WebDriver");
const chrome = require("selenium-WebDriver/chrome");
const assert = require("assert");

async function test() {
    let options = new chrome.Options();
    options.addArguments("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
    let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
    

    try {
        
        await driver.manage().window().maximize();
        await driver.executeScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})");
        await driver.executeScript("delete navigator.__proto__.webdriver;");


        await driver.get("https://www.southwest.com");
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        await driver.wait(until.elementLocated(By.id("LandingAirBookingSearchForm_originationAirportCode")), 1000);
        const origin = await driver.findElement(By.id("LandingAirBookingSearchForm_originationAirportCode"));
        await origin.click();
        await origin.sendKeys(Key.chord(Key.CONTROL, 'a'));
        await origin.sendKeys(Key.BACK_SPACE);
        await origin.sendKeys("SAN");

        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.actions().sendKeys(Key.ENTER).perform();

        await driver.wait(until.elementLocated(By.id("LandingAirBookingSearchForm_destinationAirportCode")), 1000);

        await driver.findElement(By.id("LandingAirBookingSearchForm_destinationAirportCode")).sendKeys("SJC");

        await driver.actions().sendKeys(Key.ENTER).perform();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.actions().move({ x: 148, y: 561 }).click().perform();


        await driver.wait(until.elementLocated(By.id("LandingAirBookingSearchForm_departureDate")), 1000);

        await driver.findElement(By.id("LandingAirBookingSearchForm_departureDate")).clear();
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.findElement(By.id("LandingAirBookingSearchForm_departureDate")).sendKeys("10/24");
        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.actions().sendKeys(Key.ENTER).perform();

        await driver.wait(until.elementLocated(By.id("LandingAirBookingSearchForm_returnDate")), 1000);

        await driver.findElement(By.id("LandingAirBookingSearchForm_returnDate")).sendKeys("10/25");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await driver.actions().sendKeys(Key.ENTER).perform();

        await driver.wait(until.elementLocated(By.id("LandingAirBookingSearchForm_submit-button")), 1000);

        await driver.findElement(By.id("LandingAirBookingSearchForm_submit-button"
        )).click();
        await new Promise(resolve => setTimeout(resolve, 10000));
        
    } catch (error) {
        console.log('error', error);

    }
    finally {
        await driver.quit();
    }
}

test();