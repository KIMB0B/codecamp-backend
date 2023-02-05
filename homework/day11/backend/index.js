// express
import express from "express";
import cors from "cors";
// mongoose DB
import mongoose from "mongoose";
// Swagger API Docs
import SwaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
// Models
import { UserCollection } from "./models/user.model.js";
import { TokenCollection } from "./models/token.model.js";
import { StarbucksCollection } from "./models/starbucks.model.js";
// Services
import { EmailServie } from "./controllers/services/email.service.js";
import { PhoneService } from "./controllers/services/phone.service.js";
import { UserService } from "./controllers/services/users.service.js";
// Controllers
import { UserController } from "./controllers/user.controller.js";
import { PhoneController } from "./controllers/phone.controller.js";
import { MenuController } from "./controllers/menu.controller.js";

// Controller 선언
const userController = new UserController(
    UserCollection,
    TokenCollection,
    UserService,
    PhoneService,
    EmailServie
);
const phoneController = new PhoneController(TokenCollection, PhoneService);
const menuController = new MenuController(StarbucksCollection);

// Mongoose DB 설정
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://database:27017/mini-project");

// Express 설정
const in_port = 3000;
const out_port = 4000;
const app = express();
app.use(express.json());
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerJSDoc(options)));
app.use(cors());

app.listen(in_port, () => {
    console.log(
        `스타벅스 미니 프로젝트를 [내부 포트 ${in_port}번/외부 포트 ${out_port}번] 에서 실행중입니다...`
    );
});

app.get("/users", userController.getUser);
app.post("/users", userController.joinUser);

app.post("/tokens/phone", phoneController.setToken);
app.patch("/tokens/phone", phoneController.authToken);

app.get("/starbucks", menuController.getMenus);
