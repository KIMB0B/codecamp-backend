import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import { Product_State } from 'src/apis/productState/entities/productState.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
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

  @OneToMany(() => Product_State, (productState) => productState.STATE)
  PRODUCTSTATE: Product_State[];

  @ManyToMany(() => Product, (product) => product.STATES)
  PRODUCTS: Product[];
}
