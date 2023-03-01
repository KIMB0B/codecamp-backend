import puppeteer from "puppeteer";
import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "4530",
    database: "codecamp_project",
});
connection.connect();

// connection.query("drop table IF EXISTS PAIKDABANG", (error, rows, fields) => {
//     if (error) throw error;
// });

// connection.query(
//     "CREATE TABLE PAIKDABANG (thumb VARCHAR(255), kor_name VARCHAR(255), eng_name VARCHAR(255), category VARCHAR(255), explanation VARCHAR(255), serving_size DOUBLE, caffein DOUBLE, calorie DOUBLE, natrium DOUBLE, sugars DOUBLE, saturated_fat DOUBLE, protein DOUBLE)",
//     (error, rows, fields) => {
//         if (error) throw error;
//     }
// );

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
await page.goto("https://paikdabang.com/menu/menu_ccino/");
await new Promise((page) => setTimeout(page, 1000));

const paikdabang = await page.evaluate(() => {
    const menuList = [];
    const menuNodes = [];
    document
        .querySelector(".menu_list")
        .firstElementChild.childNodes.forEach((node) => {
            if (node.nodeType === 1) {
                menuNodes.push(node);
            }
        });

    menuNodes.forEach((menu) => {
        const oneMenu = {};
        try {
            oneMenu.thumb = menu
                .querySelector(".thumb")
                .querySelector("img").src;
        } catch {
            oneMenu.thumb = null;
        }
        try {
            oneMenu.kor_name = menu
                .querySelector(".menu_tit")
                .textContent.trim();
        } catch {
            oneMenu.kor_name = null;
        }
        try {
            oneMenu.eng_name = menu
                .querySelector(".menu_tit2")
                .textContent.replaceAll("'", "''")
                .trim();
        } catch {
            oneMenu.eng_name = null;
        }
        oneMenu.category = "paiksccino";
        try {
            oneMenu.explanation = menu
                .querySelector(".txt")
                .textContent.replaceAll("\n", "")
                .trim();
        } catch {
            oneMenu.explanation = null;
        }
        try {
            oneMenu.serving_size = menu
                .querySelector(".menu_ingredient_basis")
                .textContent.replaceAll("※ 1회 제공량 기준 : ", "")
                .replaceAll("ml", "")
                .replaceAll("g", "")
                .replaceAll(" ", "");
            oneMenu.serving_size =
                oneMenu.serving_size.length === 0 ? null : oneMenu.serving_size;
        } catch {
            oneMenu.serving_size = null;
        }
        try {
            oneMenu.caffeine = menu
                .querySelector(".ingredient_table")
                .querySelectorAll("li")[0]
                .querySelectorAll("div")[1]
                .textContent.replaceAll("-", "");
            oneMenu.caffeine =
                oneMenu.caffeine.length === 0 ? null : oneMenu.caffeine;
        } catch {
            oneMenu.caffeine = null;
        }
        try {
            oneMenu.calorie = menu
                .querySelector(".ingredient_table")
                .querySelectorAll("li")[1]
                .querySelectorAll("div")[1]
                .textContent.replaceAll("-", "");
            oneMenu.calorie =
                oneMenu.calorie.length === 0 ? null : oneMenu.calorie;
        } catch {
            oneMenu.calorie = null;
        }
        try {
            oneMenu.natrium = menu
                .querySelector(".ingredient_table")
                .querySelectorAll("li")[2]
                .querySelectorAll("div")[1]
                .textContent.replaceAll("-", "");
            oneMenu.natrium =
                oneMenu.natrium.length === 0 ? null : oneMenu.natrium;
        } catch {
            oneMenu.natrium = null;
        }
        try {
            oneMenu.sugars = menu
                .querySelector(".ingredient_table")
                .querySelectorAll("li")[3]
                .querySelectorAll("div")[1]
                .textContent.replaceAll("-", "");
            oneMenu.sugars =
                oneMenu.sugars.length === 0 ? null : oneMenu.sugars;
        } catch {
            oneMenu.sugars = null;
        }
        try {
            oneMenu.saturated_fat = menu
                .querySelector(".ingredient_table")
                .querySelectorAll("li")[4]
                .querySelectorAll("div")[1]
                .textContent.replaceAll("-", "");
            oneMenu.saturated_fat =
                oneMenu.saturated_fat.length === 0
                    ? null
                    : oneMenu.saturated_fat;
        } catch {
            oneMenu.saturated_fat = null;
        }
        try {
            oneMenu.protein = menu
                .querySelector(".ingredient_table")
                .querySelectorAll("li")[5]
                .querySelectorAll("div")[1]
                .textContent.replaceAll("-", "");
            oneMenu.protein =
                oneMenu.protein.length === 0 ? null : oneMenu.protein;
        } catch {
            oneMenu.protein = null;
        }

        menuList.push(oneMenu);
    });
    return menuList;
});

paikdabang.forEach((menu) => {
    connection.query(
        `INSERT INTO PAIKDABANG VALUES('${menu.thumb}', '${menu.kor_name}', '${menu.eng_name}', '${menu.category}', '${menu.explanation}', ${menu.serving_size}, ${menu.caffeine}, ${menu.calorie}, ${menu.natrium}, ${menu.sugars}, ${menu.saturated_fat}, ${menu.protein})`
    );
});

connection.commit();
connection.end();
browser.close();
