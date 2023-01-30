import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
    checkValidationEmail,
    getWelcomeTemplate,
    sendWelcomeTemplateToEmail,
} from "./email.js";
import { Board } from "./models/board.model.js";
import { Stock } from "./models/stock.model.js";

// 몽고DB 접속!!
mongoose.connect("mongodb://my-database:27017/mydocker03");

//const express = require('express')
const app = express();
const port = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(express.json());
app.use(cors.apply());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get("/boards", async (req, res) => {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    // const result = [
    //     {
    //         number: 1,
    //         writer: "철수",
    //         title: "철수 제목입니다~~",
    //         contents: "철수 내용@@",
    //     },
    //     {
    //         number: 1,
    //         writer: "영희",
    //         title: "영희 제목입니다~~",
    //         contents: "영희 내용@@",
    //     },
    //     {
    //         number: 1,
    //         writer: "훈이",
    //         title: "훈이 제목입니다~~",
    //         contents: "훈이 내용@@",
    //     },
    // ];
    const result = await Board.find();

    // 2. 꺼내온 결과 응답 주기
    res.send(result);
});

app.post("/boards", async (req, res) => {
    console.log(req.body);
    // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
    const board = new Board({
        writer: req.body.writer,
        title: req.body.title,
        contents: req.body.contents,
    });

    await board.save();

    // 2. 저장 결과 응답 주기
    res.send("게시물 등록에 성공하였습니다!!");
});

app.post("/token/phone", (req, res) => {
    const myphone = req.body.myphone;
    const tokenLength = 6;

    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone);
    if (isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken(tokenLength);

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken);
        res.send(`${myphone} 번호 인증완료!!!`);
    } else {
        res.send(`${myphone} 번호 인증실패!!!`);
    }
});

app.post("/users", (req, res) => {
    const user = req.body.myuser;
    console.log(user);

    // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = checkValidationEmail(user.email);
    if (isValid) {
        // 2. 가입환영 템플릿 만들기
        const template = getWelcomeTemplate(user);

        // 3. 이메일에 가입환영 템플릿 전송하기
        sendWelcomeTemplateToEmail(user.email, template);
        res.send(`${user.email}에 메일 전송 성공!`);
    }
    res.send(`${user.email}에 메일 전송 성공!`);
});

app.get("/stocks", async (req, res) => {
    const stocks = await Stock.find();
    res.send(stocks);
});
