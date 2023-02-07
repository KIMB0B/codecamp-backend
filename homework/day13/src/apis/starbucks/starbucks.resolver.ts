import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StarbucksInput } from './dto/starbucks.input';
import { Starbucks } from './entities/starbucks.entity';
import { StarbucksService } from './starbucks.service';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarbucksService) {}

  @Mutation(() => String)
  async createStarbucks(@Args('input') starbucksInput: StarbucksInput) {
    console.log(await this.starbucksService.create(starbucksInput));
    return '등록에 성공하였습니다.';
  }

  @Query(() => [Starbucks])
  async fetchStarbucks(): Promise<Starbucks[]> {
    return await this.starbucksService.findAll();
  }
}
