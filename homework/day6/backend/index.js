import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { options } from "./swagger/config.js";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
    checkValidationEmail,
    getWelcomeTemplate,
    sendWelcomeTemplateToEmail,
} from "./email.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get("/users", (req, res) => {
    const users = [
        {
            email: "aaa@gmail.com",
            name: "철수",
            phone: "010-1234-5678",
            personal: "220110-2222222",
            prefer: "https://naver.com",
        },
        {
            email: "bbb@gmail.com",
            name: "민수",
            phone: "010-2345-6789",
            personal: "330110-3333333",
            prefer: "https://daum.net",
        },
        {
            email: "ccc@gmail.com",
            name: "재수",
            phone: "010-3456-7891",
            personal: "440110-4444444",
            prefer: "https://google.com",
        },
        {
            email: "ddd@gmail.com",
            name: "박수",
            phone: "010-4567-8910",
            personal: "550110-5555555",
            prefer: "https://yahoo.com",
        },
        {
            email: "eee@gmail.com",
            name: "병수",
            phone: "010-5678-9101",
            personal: "660110-6666666",
            prefer: "https://youtube.com",
        },
    ];
    res.send(users);
});

app.get("/starbucks", (req, res) => {
    const menus = [
        { name: "아메리카노", kcal: 5 },
        { name: "카페라떼", kcal: 10 },
        { name: "카페모카", kcal: 15 },
        { name: "큐브라떼", kcal: 20 },
        { name: "연유라떼", kcal: 25 },
        { name: "자바칩프라푸치노", kcal: 30 },
        { name: "녹차", kcal: 35 },
        { name: "페퍼민트", kcal: 40 },
        { name: "아포카토", kcal: 45 },
        { name: "7레이어가나슈", kcal: 50 },
    ];
    res.send(menus);
});

app.post("/token/phone", (req, res) => {
    const tokenLength = 6;
    const phoneNumber = req.body.myphone;
    if (checkValidationPhone(phoneNumber) === true) {
        const token = getToken(tokenLength);
        try {
            sendTokenToSMS(
                phoneNumber[0] + phoneNumber[1] + phoneNumber[2],
                token
            );
        } catch (err) {
            res.send(`메시지 전송 에러!! -> ${err}`);
        }
        res.send(
            `[${phoneNumber[0]}-${phoneNumber[1]}-${phoneNumber[2]}] 핸드폰 번호로 인증번호 [${token}]를 전송했습니다!`
        );
    }
    res.send(
        `[${phoneNumber[0]}-${phoneNumber[1]}-${phoneNumber[2]}] 핸드폰 번호의 형식이 맞지 않아 인증번호 전달을 실패했습니다.`
    );
});

app.post("/users", (req, res) => {
    const user = req.body.myuser;

    // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = checkValidationEmail(user.email);
    if (isValid) {
        // 2. 가입환영 템플릿 만들기
        const template = getWelcomeTemplate(user);

        // 3. 이메일에 가입환영 템플릿 전송하기
        sendWelcomeTemplateToEmail(user.email, template);
        res.send(`${user.email}에 메일 전송 성공!`);
    }
    res.send(`${user.email}에 메일 전송 실패!`);
});

app.listen(port, () => {
    console.log(`${port}번 포트에서 6일차 과제 실행중입니다.`);
});
