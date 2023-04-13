import { Field, ObjectType } from '@nestjs/graphql';
import { Product_State } from 'src/apis/productState/entities/productState.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class State {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ID: number;

  @Column()
  @Field(() => String)
  NAME: string;

  @DeleteDateColumn()
  DELETEAT: Date;

  @OneToMany(() => Product_State, (productState) => productState.PRODUCT)
  PRODUCTSTATE: Product_State[];
}
