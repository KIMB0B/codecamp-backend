import puppeteer from "puppeteer";

async function startCrawling() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto("https://finance.naver.com/item/sise.naver?code=005930");
    await new Promise((page) => setTimeout(page, 1000));
    const framePage = page
        .frames()
        .find((el) => el.url().includes("/item/sise_day.naver?code=005930"));

    const Samsung = {};
    for (let i = 3; i <= 7; i++) {
        const samsung = {};
        const date = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
            (el) => el.textContent
        );
        const price = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
            (el) => el.textContent
        );
        samsung["날짜"] = date;
        samsung["가격"] = price;
        Samsung[i - 3] = samsung;
    }

    console.log(Samsung);

    await browser.close();
}

startCrawling();
