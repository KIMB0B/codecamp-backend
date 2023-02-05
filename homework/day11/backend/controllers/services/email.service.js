import { getToday } from "./utils.service.js";
import nodemailer from "nodemailer";
import "dotenv/config.js";

export class EmailServie {
    checkValidationEmail(email) {
        if (email === undefined || !email.includes("@")) {
            console.log(
                `❌: 옳지 않은 형식의 이메일을 입력한 사용자가 가입을 시도했습니다.[${email}]`
            );
            return false;
        } else {
            return true;
        }
    }

    async sendWelcomeTemplateToEmail(user) {
        try {
            const template = getWelcomeTemplate(user);
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            const result = await transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to: user.email,
                subject: "회원가입을 축하합니다!!",
                html: template,
            });
            console.log(
                `✅: [${user.email}]로 환영 메일 전송에 성공했습니다. `
            );
            return result;
        } catch (err) {
            console.log(
                `❌: 환영 메일 전송에 실패했습니다. [${user.email}]\n\t${err}`
            );
            return false;
        }
    }
}

function getWelcomeTemplate({ name, personal, prefer, phone }) {
    const date = new Date();
    const age = (date.getFullYear() - parseInt(personal.substr(0, 2)) + 1)
        .toString()
        .substr(2, 2);
    return `
        <html>
            <body>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width 500px">
                        <h1 style="color: green">${name}님 가입을 환영합니다.</h1>
                        <hr />
                        <div>이름: ${name}</div>
                        <div>나이: ${age}살</div>
                        <div>좋아하는 사이트: ${prefer}</div>
                        <div>전화번호: ${phone}</div>
                        <div>가입일: ${getToday()}</div>
                    </div>
                </div>
            </body>
        </html>
    `;
}
