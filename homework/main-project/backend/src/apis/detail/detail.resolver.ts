import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DetailService } from './detail.service';
import { CreateDetailInput } from './dto/createDetail.input';
import { UpdateDetailInput } from './dto/updateDetail.input';
import { Detail } from './entities/detail.entity';

@Resolver()
export class DetailResolver {
  constructor(private readonly detailService: DetailService) {}

  @Query(() => [Detail])
  fetchDeatils() {
    return this.detailService.findAll();
  }

  @Query(() => Detail)
  fetchDetail(@Args('detailId') detailId: string) {
    return this.detailService.findById({ detailId });
  }

  @Query(() => [Detail])
  fetchDetailsByProductId(@Args('productId') productId: string) {
    return this.detailService.findByProductId({ productId });
  }

  @Query(() => [Detail])
  fetchDetailsByStateId(@Args('stateId') stateId: string) {
    return this.detailService.findByStateId({ stateId });
  }

  @Query(() => Detail)
  fetchDetailByProductStateId(
    @Args('productId') productId: string,
    @Args('stateId') stateId: string,
  ) {
    return this.detailService.findByProductStateId({ productId, stateId });
  }

  @Query(() => [Detail])
  fetchDetailsWithDeleted() {
    return this.detailService.findAllWithDeleted();
  }

  @Mutation(() => Detail)
  createDetail(
    @Args('productId') productId: string,
    @Args('stateId') stateId: string,
    @Args('createDetailInput') createDetailInput: CreateDetailInput,
  ) {
    return this.detailService.create({ productId, stateId, createDetailInput });
  }

  @Mutation(() => Detail)
  updateDetail(
    @Args('deatilId') detailId: string,
    @Args('updateDetailInput') updateDetailInput: UpdateDetailInput,
  ) {
    return this.detailService.update({ detailId, updateDetailInput });
  }

  @Mutation(() => Boolean)
  detailDelete(@Args('detailId') detailId: string) {
    return this.detailService.delete({ detailId });
  }

  @Mutation(() => Boolean)
  detailRestore(@Args('detailId') detailId: string) {
    return this.detailService.restore({ detailId });
  }
}
