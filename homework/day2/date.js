function printDate() {
    yyyy = new Date().getFullYear()
    MM = String(new Date().getMonth() + 1).padStart(2, '0')
    dd = String(new Date().getDate()).padStart(2, '0')
    hh = String(new Date().getHours()).padStart(2, '0')
    mm = String(new Date().getMinutes()).padStart(2, '0')
    ss = String(new Date().getSeconds()).padStart(2, '0')
    console.log(`오늘은 ${yyyy}년 ${MM}월 ${dd}일 ${hh}:${mm}:${ss}입니다.`) 
}

printDate()