import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { StarbucksCollection } from "./models/starbucks.model.js";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/mini-project");

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
await new Promise((page) => setTimeout(page, 1000));

const starbucks = await page.evaluate(() => {
    const coffeeList = [];
    const products = document.querySelectorAll(".menuDataSet");
    products.forEach((product) => {
        const name = product.querySelector("dl").textContent.trim();
        const img = product.querySelector("img").src;
        coffeeList.push({ name: name, img: img });
    });
    return coffeeList;
});

starbucks.forEach(async (coffee) => {
    await StarbucksCollection.updateOne(
        { name: coffee.name },
        { name: coffee.name, img: coffee.img },
        { upsert: true }
    ).exec();
});

browser.close();
