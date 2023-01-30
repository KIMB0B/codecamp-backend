import puppeteer from "puppeteer";

async function startCrawling() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto("https://www.goodchoice.kr/product/search/2");
    await page.waitForSelector("#poduct_list_area > li:nth-child(2) > a > div");

    const star = await page.$eval(
        "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
        (el) => el.textContent
    );
    const location = await page.$eval(
        "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
        (el) => el.textContent.trim()
    );
    const price = await page.$eval(
        "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
        (el) => el.textContent
    );
    console.log(`${star} ${location} ${price}`);
}

startCrawling();
