import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  // hello() {
  //   return 'Hello world!';
  // }

  findAll() {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '철수 제목입니다~~',
        contents: '철수 내용@@',
      },
      {
        number: 1,
        writer: '영희',
        title: '영희 제목입니다~~',
        contents: '영희 내용@@',
      },
      {
        number: 1,
        writer: '훈이',
        title: '훈이 제목입니다~~',
        contents: '훈이 내용@@',
      },
    ];
    return result;
  }

  create() {
    return '등록에 성공하였습니다!!';
  }
}
