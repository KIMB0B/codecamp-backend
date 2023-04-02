import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // MySQL에 Entity를 사용하기 위해 사용
@ObjectType() // Graphql에 Entity를 사용하기 위해 사용
export class Board {
  @PrimaryGeneratedColumn('increment') // MySQL에 Entity를 사용하기 위해 사용
  @Field(() => Int) // Graphql에 Entity를 사용하기 위해 사용(Graphql식 형 변환)
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
