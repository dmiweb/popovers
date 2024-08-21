import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("test popover ", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: false,
    });

    page = await browser.newPage();
  });

  test("test show popover", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".btn");

    const button = await page.$(".btn");

    await button.click();

    // await page.waitForSelector(".popover");
    await page.locator('.popover').wait();
  });

  test("test hide popover", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".btn");

    const button = await page.$(".btn");

    await button.click();
    await button.click();

    const popover = await page.$('.popover');
    expect(popover).toBe(null);
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("should add do something", async () => {
    await page.goto(baseUrl);
  });
});
