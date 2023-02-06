import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  hello() {
    return 'Hello world!';
  }
}
