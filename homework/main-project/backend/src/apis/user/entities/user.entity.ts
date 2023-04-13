import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ID: string;

  @Column()
  @Field(() => String)
  EMAIL: string;

  @Column()
  // @Field(() => String)
  PASSWORD: string;

  @Column()
  @Field(() => String)
  NAME: string;

  @Column()
  @Field(() => Int)
  AGE: number;

  @DeleteDateColumn()
  DELETEAT: Date;
}
