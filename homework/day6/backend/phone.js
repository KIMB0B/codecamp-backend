import coolsms from 'coolsms-node-sdk'
import 'dotenv/config'

export function checkValidationPhone(myphone) {
    if (myphone[0].length != 3 || (myphone[1].length != 3 && myphone[1].length != 4) || myphone[2].length != 4) {
        console.log(`[${myphone[0]}-${myphone[1]}-${myphone[2]}] 번호의 형식이 옳지 않아 토큰 생성에 실패했습니다!`);
        return false;
    } else {
        return true;
    }
}

export function getToken(count) {
    if (count === undefined) {
        console.log('에러 발생!!! 토큰 길이를 제대로 입력해 주세요!!!');
        return;
    } else if (count <= 0) {
        console.log('에러 발생!!! 토큰의 길이가 너무 적습니다!!!');
        return;
    } else if (count > 10) {
        console.log('에러 발생!!! 토큰의 길이가 너무 많습니다!!!');
        return;
    }
    const result = String(Math.floor(Math.random() * 10 ** count)).padStart(count, '0');
    return result;
}

export async function sendTokenToSMS(phoneNumber, tokenNumber) {
    const messageService = new coolsms.default(process.env.SMS_KEY, process.env.SMS_SECRET);

    const result = await messageService.sendOne({
        to: phoneNumber,
        from: process.env.SMS_SENDER,
        text: `안녕하세요!! 요청하신 인증번호는 [${tokenNumber}] 입니다.`
    });
    console.log(result)
}