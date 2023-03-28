import { Field, ObjectType } from '@nestjs/graphql';
import { Product_State } from 'src/apis/productState/entities/productState.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ID: number;

  @Column()
  @Field(() => String)
  URL: string;

  @ManyToOne(() => Product_State)
  @Field(() => Product_State)
  PRODUCTSTATE: Product_State;

  @DeleteDateColumn()
  DELETEAT: Date;
}
