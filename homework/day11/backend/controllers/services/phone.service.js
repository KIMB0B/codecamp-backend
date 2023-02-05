import coolsms from "coolsms-node-sdk";
import "dotenv/config.js";

export class PhoneService {
    checkValidationPhone(myphone) {
        if (
            myphone[0].length != 3 ||
            (myphone[1].length != 3 && myphone[1].length != 4) ||
            myphone[2].length != 4
        ) {
            console.log(
                `❌: 형식에 맞지 않은 번호 [${myphone[0]}-${myphone[1]}-${myphone[2]}]가 토큰 생성을 시도했습니다.`
            );
            return false;
        } else {
            return true;
        }
    }

    getToken(length) {
        if (length === undefined || length <= 0 || length > 10) {
            console.log(`❌: 토큰 길이 지정에 문제가 있습니다.`);
            return false;
        }
        const result = String(
            Math.floor(Math.random() * 10 ** length)
        ).padStart(length, "0");
        return result;
    }

    async sendTokenToSMS(phoneNumber, tokenNumber) {
        try {
            const messageService = new coolsms.default(
                process.env.SMS_KEY,
                process.env.SMS_SECRET
            );

            const result = await messageService.sendOne({
                to: phoneNumber,
                from: process.env.SMS_SENDER,
                text: `스타벅스에서 요청하신 인증번호는 [${tokenNumber}] 입니다.`,
            });
            console.log(`✅: 문자 전송에 성공했습니다.[${phoneNumber}]`);
        } catch (err) {
            console.log(
                `❌: 문자 전송에 오류가 있습니다.[${phoneNumber}]\n\t[${err}]`
            );
        }
    }

    async isAuthPhone(tokenModel, phone) {
        const findResult = await tokenModel.findOne({
            phone: phone,
        });
        try {
            if (findResult.isAuth === true) {
                return true;
            } else {
                console.log(
                    `❌: 핸드폰 번호가 인증되지 않은 사용자가 가입을 시도했습니다.[${phone}]`
                );
                return false;
            }
        } catch {
            console.log(
                `❌: Tokens DB에 있지 않은 사용자가 가입을 시도했습니다.[${phone}]`
            );
            return false;
        }
    }

    async setTokenInDB(tokenModel, phone, token) {
        try {
            if (!(await tokenModel.findOne({ phone: phone }))) {
                const newPhone = new tokenModel({
                    phone: phone,
                    token: token,
                    isAuth: false,
                });
                await newPhone.save();
            } else {
                await tokenModel.updateOne(
                    { phone: phone },
                    { token: token, isAuth: false }
                );
            }
            return true;
        } catch (err) {
            console.log(
                `❌: 핸드폰 번호가 DB에 저장이 되지 않았습니다.[${phone}]\n\t${err}`
            );
            return false;
        }
    }

    async checkToken(tokenModel, phone, token) {
        const accordPhone = await tokenModel
            .findOne({
                phone: phone,
            })
            .exec();
        if (!accordPhone) {
            console.log(
                `❌: Tokens DB에 없는 전화번호로 토큰 인증을 시도했습니다.[${phone}]`
            );
            return -1;
        } else if (accordPhone.token !== token) {
            console.log(
                `❌: 일치하지 않은 토큰을 인증 시도했습니다.[${phone}:${token}]`
            );
            return 0;
        } else {
            await tokenModel.updateOne({ phone: phone }, { isAuth: true });
            return 1;
        }
    }
}
