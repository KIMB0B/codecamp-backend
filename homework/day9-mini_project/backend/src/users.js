import axios from "axios";
import cheerio from "cheerio";

export async function makeOG(url) {
    const og = {};
    const html = await axios.get(url).then((value) => value.data);
    const $ = cheerio.load(html);
    $("meta").each((_, el) => {
        if ($(el).attr("property")) {
            const key = $(el).attr("property").split(":")[1];
            const value = $(el).attr("content");
            og[key] = value;
        }
    });
    return og;
}

export function secure(personal) {
    const personalArray = personal.split("-");
    return personalArray[0] + "-*******";
}
