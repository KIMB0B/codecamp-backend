import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";

const app = express();

const productController = new ProductController();

// 상품 API
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

const couponController = new CouponController();

// 쿠폰 API
app.post("/coupons/buy", couponController.buyCoupon);

app.listen(3000);
