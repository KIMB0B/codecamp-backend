import { Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => String) // getHello()의 return type이 String
  getHello() {
    return this.boardService.hello();
  }
}
