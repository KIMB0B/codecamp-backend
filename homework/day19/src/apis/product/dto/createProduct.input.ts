import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  KOR_NAME: string;

  @Field(() => String)
  ENG_NAME: string;

  @Field(() => String)
  EXPLANATION: string;

  @Field(() => String)
  CATEGORYID: string;

  @Field(() => [String])
  STATES: string[];
}
