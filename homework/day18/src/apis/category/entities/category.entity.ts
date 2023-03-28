import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ID: number;

  @Column()
  @Field(() => String)
  NAME: string;

  @DeleteDateColumn()
  DELETEAT: Date;
}
