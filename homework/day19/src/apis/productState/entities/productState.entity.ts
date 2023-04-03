import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import { State } from 'src/apis/state/entities/state.entity';
import {
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product_State {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ID: number;

  @ManyToOne(() => Product, (product) => product.PRODUCTSTATE, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => Product)
  PRODUCT: Product;

  @ManyToOne(() => State, (state) => state.PRODUCTSTATE, {
    onDelete: 'CASCADE',
  })
  @JoinColumn() // 선택적: 열 이름을 지정할 수 있음
  @Field(() => State)
  STATE: State;

  @DeleteDateColumn()
  DELETEAT: Date;
}
