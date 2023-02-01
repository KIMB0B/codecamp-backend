import express from "express";
import cors from "cors";
import SwaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import mongoose from "mongoose";
import { options } from "../swagger/config.js";
import {
    checkValidationPhone,
    getToken,
    setTokenInDB,
    isAuthPhone,
    checkToken,
} from "./phone.js";
import { checkValidationEmail, sendWelcomeTemplateToEmail } from "./email.js";
import { makeOG, secure } from "./users.js";
import { UserCollection } from "../models/user.model.js";
import { StarbucksCollection } from "../models/starbucks.model.js";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://database:27017/mini-project");

const in_port = 3000;
const out_port = 4000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerJSDoc(options)));

app.listen(in_port, () => {
    console.log(
        `스타벅스 미니 프로젝트를 [내부 포트 ${in_port}번/외부 포트 ${out_port}번] 에서 실행중입니다...`
    );
});

app.get("/users", async (req, res) => {
    res.send(await UserCollection.find());
});

app.post("/users", async (req, res) => {
    const newUser = req.body.newUser;
    if ((await isAuthPhone(newUser.phone)) === true) {
        if (checkValidationEmail(newUser.email) === true) {
            const og = await makeOG(newUser.prefer);
            console.log(og);
            const securePersonal = secure(newUser.personal);
            const user = new UserCollection({
                name: newUser.name,
                email: newUser.email,
                personal: securePersonal,
                prefer: newUser.prefer,
                pwd: newUser.pwd,
                phone: newUser.phone,
                og: og,
            });
            await user.save();
            await sendWelcomeTemplateToEmail(newUser);
            console.log(
                `✅: "${user.name}" 사용자가 신규 가입에 성공했습니다.`
            );
            res.send(user._id);
        } else {
            res.status(422).send("NotValidationEmail");
        }
    } else {
        res.status(422).send("NotAuthPhone");
    }
});

app.post("/tokens/phone", async (req, res) => {
    const phoneArray = req.body.phone;
    const tokenLength = req.body.tokenLen;
    const phone = phoneArray[0] + phoneArray[1] + phoneArray[2];

    const isValid = checkValidationPhone(phoneArray);
    if (isValid) {
        const token = getToken(tokenLength);
        if (token !== false) {
            if ((await setTokenInDB(phone, token)) === true) {
                console.log(
                    `✅: [${phoneArray[0]}-${phoneArray[1]}-${phoneArray[2]}]의 Tokens DB 저장에 성공했습니다.`
                );
                // sendTokenToSMS(phone, token);
                console.log(
                    `✅: [${phoneArray[0]}-${phoneArray[1]}-${phoneArray[2]}] 번호로 인증번호 '${token}'이 전송되었습니다.`
                );
                res.send(phone);
            } else {
                res.status(422).send("NotSavedInTokenDB");
            }
        } else {
            res.status(422).send("NotGoodTokenLength");
        }
    } else {
        res.status(422).send("NotValidationPhone");
    }
});

app.patch("/tokens/phone", async (req, res) => {
    const phone = req.body.phone;
    const token = req.body.token;

    const checkResult = await checkToken(phone, token);
    if (checkResult === -1) {
        res.send("NotPhoneInDB");
    } else if (checkResult === 0) {
        res.send("NotSameToken");
    } else {
        console.log(`✅: [${phone}] 번호가 인증되었습니다.`);
        res.send(phone);
    }
});
