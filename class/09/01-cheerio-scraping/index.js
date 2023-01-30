import axios from "axios";
import cheerio from "cheerio";

async function getHTML(mydata) {
    // 1. 입력된 컨텐츠에서 http로 시작하는 글자 있는지 찾기
    const result = [];
    const myurl = mydata.contents
        .split(" ")
        .filter((el) => el.includes("http"));

    // 2. 만약 있다면, 찾은 주소로 xios.get  요청해서 html코드 받아오기 => 스크래핑
    for (var i = 0; i < myurl.length; i++) {
        result.push(await axios.get(myurl[i]).then((value) => value.data));
    }
    return result;
}

function createBoardAPI(htmls) {
    // 3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
    const openGraphs = {};

    htmls.forEach((value, index) => {
        const openGraph = {};
        const $ = cheerio.load(value);

        $("meta").each((_, el) => {
            if ($(el).attr("property")) {
                const key = $(el).attr("property").split(":")[1];
                const value = $(el).attr("content");
                openGraph[key] = value;
            }
        });
        openGraphs[index] = openGraph;
    });

    return openGraphs;
}

const frontendData = {
    title: "안녕하세요~~",
    contents:
        "여기 정말 좋은거 같아요! 한번 꼭 놀러오세요!! 여기가 어디냐면 https://www.daum.net https://www.naver.com https://www.facebook.com https://www.tistory.com https://www.nexon.com 이예요!!",
};

const htmlData = await getHTML(frontendData);

console.log(createBoardAPI(htmlData));
