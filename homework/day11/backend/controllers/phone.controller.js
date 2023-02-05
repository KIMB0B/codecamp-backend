export class PhoneController {
    constructor(tokenModel, phoneService) {
        this.tokenModel = tokenModel;
        this.phoneService = phoneService;
    }

    setToken = async (req, res) => {
        const phoneArray = req.body.phone.split("-");
        const tokenLength = req.body.tokenLen;
        const phone = phoneArray[0] + phoneArray[1] + phoneArray[2];

        const isValid = this.phoneService.checkValidationPhone(phoneArray);
        if (isValid) {
            const token = this.phoneService.getToken(tokenLength);
            if (token !== false) {
                if (
                    (await this.phoneService.setTokenInDB(
                        this.tokenModel,
                        phone,
                        token
                    )) === true
                ) {
                    console.log(
                        `✅: [${req.body.phone}]의 Tokens DB 저장에 성공했습니다.`
                    );
                    //sendTokenToSMS(phone, token);
                    console.log(
                        `✅: [${req.body.phone}] 번호로 인증번호 '${token}'이 전송되었습니다.`
                    );
                    res.send(phone);
                } else {
                    res.status(424).send("NotSavedInTokenDB");
                }
            } else {
                res.status(423).send("NotGoodTokenLength");
            }
        } else {
            res.status(422).send("NotValidationPhone");
        }
    };

    authToken = async (req, res) => {
        const phone = req.body.phone;
        const token = req.body.token;

        const checkResult = await this.phoneService.checkToken(
            this.tokenModel,
            phone,
            token
        );
        if (checkResult === -1) {
            res.send("NotPhoneInDB");
        } else if (checkResult === 0) {
            res.send("NotSameToken");
        } else {
            console.log(`✅: [${phone}] 번호가 인증되었습니다.`);
            res.send(phone);
        }
    };
}
