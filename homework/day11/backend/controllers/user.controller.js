export class UserController {
    constructor(
        userModel,
        tokenModel,
        userService,
        phoneService,
        emailService
    ) {
        this.userModel = userModel;
        this.tokenModel = tokenModel;
        this.userService = userService;
        this.phoneService = phoneService;
        this.emailService = emailService;
    }

    getUser = async (req, res) => {
        try {
            res.send(await this.userModel.find());
        } catch {
            res.status(422).send("NotConnectedDB");
        }
    };

    joinUser = async (req, res) => {
        const newUser = req.body.newUser;
        if (
            (await this.phoneService.isAuthPhone(
                this.tokenModel,
                newUser.phone
            )) === true
        ) {
            if (
                this.emailService.checkValidationEmail(newUser.email) === true
            ) {
                const og = await this.userService.makeOG(newUser.prefer);
                const securePersonal = this.userService.secure(
                    newUser.personal
                );
                const user = new this.userModel({
                    name: newUser.name,
                    email: newUser.email,
                    personal: securePersonal,
                    prefer: newUser.prefer,
                    pwd: newUser.pwd,
                    phone: newUser.phone,
                    og: og,
                });
                await user.save();
                await this.emailService.sendWelcomeTemplateToEmail(newUser);
                console.log(
                    `✅: "${user.name}" 사용자가 신규 가입에 성공했습니다.`
                );
                res.send(user._id);
            } else {
                res.status(423).send("NotValidationEmail");
            }
        } else {
            res.status(422).send("NotAuthPhone");
        }
    };
}
