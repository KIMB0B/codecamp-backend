import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class StarbucksInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  servingSize: number;

  @Field(() => Int)
  saturatedFat: number;

  @Field(() => Int)
  protein: number;

  @Field(() => Int)
  natrium: number;

  @Field(() => Int)
  sugar: number;

  @Field(() => Int)
  caffeine: number;
}
