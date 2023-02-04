import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";

const app = express();

const cashService = new CashService(); // new 한번으로 모든 곳에서 재사용 가능(약한 결합/싱글톤 패턴)
const pointService = new PointService();
const productService = new ProductService();

const productController = new ProductController(cashService, productService);
const couponController = new CouponController(pointService);

// 상품 API
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

// 쿠폰 API
app.post("/coupons/buy", couponController.buyCoupon);

app.listen(3000);
