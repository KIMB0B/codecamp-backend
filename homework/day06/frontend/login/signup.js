// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  // 1. 입력한 휴대폰번호 가져오기
  const phoneNumber = [document.querySelector('#PhoneNumber01').value, document.querySelector('#PhoneNumber02').value, document.querySelector('#PhoneNumber03').value]

  // 2. 해당 휴대폰번호로 인증번호 요청하기
  axios.post("http://localhost:3000/token/phone", {myphone: phoneNumber}).then((res) => {
      console.log(res)
  })
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const user = {
    name: document.querySelector('#SignupName').value,
    residentNumber: document.querySelector('#SignupPersonal').value,
    phoneNumber: [document.querySelector('#PhoneNumber01').value, document.querySelector('#PhoneNumber02').value, document.querySelector('#PhoneNumber03').value],
    favoriteSite: document.querySelector('#SignupPrefer').value,
    email: document.querySelector('#SignupEmail').value,
    password: document.querySelector('#SignupPwd').value
  }

  axios.post("http://localhost:3000/users", {myuser: user}).then((res) => {
    console.log(res)
  })
}
