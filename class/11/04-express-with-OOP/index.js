import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

// 상품 구매하기
app.post("/", (req, res) => {
    // 1. 가진돈 검증하는 코드
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    // 2. 판매 여부를 검증하는 코드
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
        res.send("상품 구매 완료!");
    }
});

// 상품 환불하기
app.post("/", (req, res) => {
    // 1. 판매 여부를 검증하는 코드
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if (isSoldout) {
        res.send("상품 환불 완료!!");
    }
});
