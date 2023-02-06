// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
    const phoneNumber =
        document.querySelector("#PhoneNumber01").value +
        "-" +
        document.querySelector("#PhoneNumber02").value +
        "-" +
        document.querySelector("#PhoneNumber03").value;
    axios
        .post("http://localhost:4000/tokens/phone", {
            phone: phoneNumber,
            tokenLen: 6,
        })
        .then((res) => {
            if (res.data === "NotGoodTokenLength") {
                // 토큰 길이 형식이 맞지 않을 때의 로직
                document.querySelector(
                    "#ValidationInputWrapper"
                ).style.display = "none";
            } else if (res.data === "NotValidationPhone") {
                // 번호 형식이 틀릴 때의 로직
                document.querySelector(
                    "#ValidationInputWrapper"
                ).style.display = "none";
            } else {
                // 인증번호 전송이 성공했을 떄의 로직
                document.querySelector(
                    "#ValidationInputWrapper"
                ).style.display = "flex";
                console.log(`${res.data} 번호 토큰 생성 성공!`);
            }
        });
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
    const phoneNumber =
        document.querySelector("#PhoneNumber01").value +
        document.querySelector("#PhoneNumber02").value +
        document.querySelector("#PhoneNumber03").value;
    const tokenNumber = document.querySelector("#TokenInput").value;

    axios
        .patch("http://localhost:4000/tokens/phone", {
            phone: phoneNumber,
            token: tokenNumber,
        })
        .then((res) => {
            if (res.data === "NotPhoneInDB") {
                // 전화번호가 DB에 없을 때의 로직
            } else if (res.data === "NotSameToken") {
                // 맞지 않는 토큰을 입력했을 때의 로직
            } else {
                // 토큰 인증에 성공했을 때의 로직");
                console.log(`${phoneNumber} 번호 토큰 인증 성공!`);
            }
        });
};

// 회원 가입 API 요청
const submitSignup = async () => {
    const user = {
        name: document.querySelector("#SignupName").value,
        email: document.querySelector("#SignupEmail").value,
        personal:
            document.querySelector("#SignupPersonal1").value +
            "-" +
            document.querySelector("#SignupPersonal2").value,
        prefer: document.querySelector("#SignupPrefer").value,
        pwd: document.querySelector("#SignupPwd").value,
        phone:
            document.querySelector("#PhoneNumber01").value +
            document.querySelector("#PhoneNumber02").value +
            document.querySelector("#PhoneNumber03").value,
    };
    axios.post("http://localhost:4000/users", { newUser: user }).then((res) => {
        if (res.data === "NotValidationEmail") {
            // 이메일이 옳지 않을 때의 로직
        } else if (res.data === "NotAuthPhone") {
            // 핸드폰 번호가 인증되지 않거나 옳지 않을 떄의 로직
        } else {
            // 가입이 성공했을 때의 로직
            console.log(`[ID: ${res.data}] 회원 신규 가입 완료`);
        }
    });
};
