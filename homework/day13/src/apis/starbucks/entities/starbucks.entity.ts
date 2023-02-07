import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType({ description: 'Starbucks' })
@Entity()
export class Starbucks {
  @Field(() => String)
  @PrimaryColumn()
  name: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Int)
  @Column()
  servingSize: number;

  @Field(() => Int)
  @Column()
  saturatedFat: number;

  @Field(() => Int)
  @Column()
  protein: number;

  @Field(() => Int)
  @Column()
  natrium: number;

  @Field(() => Int)
  @Column()
  sugar: number;

  @Field(() => Int)
  @Column()
  caffeine: number;
}
