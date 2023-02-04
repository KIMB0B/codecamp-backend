// import { CashService } from "./services/cash.service.js";

export class CouponController {
    constructor(moneyService) {
        this.moneyService = moneyService;
    }

    buyCoupon = (req, res) => {
        // 쿠폰 구매하기
        app.post("/coupons/buy", (req, res) => {
            // 1. 가진돈 검증하는 코드
            // const cashService = new CashService();
            const hasMoney = moneyService.checkValue();

            // 2. 쿠폰 구매하는 코드
            if (hasMoney) {
                res.send("쿠폰 구매 완료!");
            }
        });
    };
}
