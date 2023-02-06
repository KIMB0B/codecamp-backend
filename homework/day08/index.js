import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { TokenCollection } from "./models/token.model.js";

const app = express();
const port = 3000;

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(express.json());
app.use(cors.apply());

app.post("/tokens/phone", async (req, res) => {
    const phone = req.body.phone;
    const tokenLength = 6;

    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(phone);
    if (isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        const token = getToken(tokenLength);

        if (!(await TokenCollection.findOne({ phone: phone }))) {
            const newPhone = new TokenCollection({
                phone: phone,
                token: token,
                isAuth: false,
            });
            await newPhone.save();
        } else {
            await TokenCollection.updateOne({ phone: phone }, { token: token });
        }

        // 3. 핸드폰번호에 토큰 전송하기
        //sendTokenToSMS(phone, token);
        res.send(`${phone} 번호로 인증번호가 전송되었습니다.`);
    }
});

app.patch("/tokens/phone", async (req, res) => {
    const phone = req.body.phone;
    const token = req.body.token;
    const accordPhone = await TokenCollection.findOne({ phone: phone });

    if (!accordPhone) {
        res.send(false);
    } else if (accordPhone.token !== token) {
        res.send(false);
    } else {
        await TokenCollection.updateOne({ phone: phone }, { isAuth: true });
        res.send(true);
    }
});

mongoose.connect("mongodb://my-database:27017/users");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
