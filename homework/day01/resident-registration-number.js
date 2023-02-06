function checkVaildRegistrationNumber(registrationNumber) {
    if (registrationNumber[6]!="-") {
        console.log("에러 발생!!! 형식이 올바르지 않습니다!!!")
        return false
    } else if (registrationNumber.length != 14) {
        console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!")
        return false
    } else {
        return true
    }
}

function hideRegistrationNumber(registrationNumber) {
    return `${registrationNumber.substr(0, 8)}******`
}

export function customRegistrationNumber(registrationNumber) {
    if (checkVaildRegistrationNumber(registrationNumber) === true) {
        return hideRegistrationNumber(registrationNumber)
    }
}

//console.log(customRegistrationNumber("980328-1111111"))