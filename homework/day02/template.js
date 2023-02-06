import {customRegistrationNumber} from "../day1/resident-registration-number.js"

const JWKim = {
    name:"김정욱",
    email:"xzsd96301@gmail.com",
    registrationNumber:"980328-1234567",
    phoneNumber:"010-8033-9803",
    favoriteSite:"www.github.com"
}

function createTemplate({name, email, registrationNumber, phoneNumber, favoriteSite}) {
    console.log(`
    <html>
        <body>
            <h1>${name}님의 가입을 환영합니다.</h1>
            <hr>
            <div>이메일: ${email}</div>
            <div>주민번호: ${customRegistrationNumber(registrationNumber)}</div>
            <div>휴대폰 번호: ${phoneNumber}</div>
            <div>내가 좋아하는 사이트: ${favoriteSite}</div>
        </body>
    <html>`)
}

createTemplate(JWKim)