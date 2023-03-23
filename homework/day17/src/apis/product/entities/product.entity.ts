import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ID: number;

  @ManyToOne(() => Category)
  C: Category;

  @Column()
  @Field(() => String)
  KOR_NAME: string;

  @Column()
  @Field(() => String)
  ENG_NAME: string;

  @Column()
  @Field(() => String)
  EXPLANATION: string;
}
