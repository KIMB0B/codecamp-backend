import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import { Product_State } from 'src/apis/productState/entities/productState.entity';
import { State } from 'src/apis/state/entities/state.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ID: number;

  @Column()
  @Field(() => String)
  KOR_NAME: string;

  @Column()
  @Field(() => String)
  ENG_NAME: string;

  @Column()
  @Field(() => String)
  EXPLANATION: string;

  @ManyToOne(() => Category)
  @Field(() => Category, { nullable: true })
  CATEGORY: Category;

  @Field(() => [State], { nullable: true })
  get STATES(): State[] {
    return this.PRODUCTSTATE.map((productState) => productState.STATE);
  }

  @DeleteDateColumn()
  DELETEAT: Date;

  @OneToMany(() => Product_State, (productState) => productState.PRODUCT)
  PRODUCTSTATE: Product_State[];
}
