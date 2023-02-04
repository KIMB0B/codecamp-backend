// import { CashService } from "./services/cash.service.js";
// import { ProductService } from "./services/product.js.js";

export class ProductController {
    constructor(moneyService, productService) {
        this.moneyService = new moneyService();
        this.productService = new productService();
    }

    buyProduct = (req, res) => {
        // 1. 가진돈 검증하는 코드
        // const cashService = new CashService();
        const hasMoney = this.moneyService.checkValue();

        // 2. 판매 여부를 검증하는 코드
        // const productService = new ProductService();
        const isSoldout = productService.checkSoldout();

        // 3. 상품 구매하는 코드
        if (hasMoney && !isSoldout) {
            res.send("상품 구매 완료!");
        }
    };

    refundProduct = (req, res) => {
        // 1. 판매 여부를 검증하는 코드
        // const productService = new ProductService();
        const isSoldout = productService.checkSoldout();

        // 2. 상품 환불하는 코드
        if (isSoldout) {
            res.send("상품 환불 완료!!");
        }
    };
}
