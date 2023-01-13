function getToken(count) {
    const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
      count,
      '0'
    );
  
    console.log(result); // 만들어진 토큰 출력
  }
  
  getToken(4);
  getToken(6);
  getToken(8);