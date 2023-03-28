import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Product_State } from 'src/apis/productState/entities/productState.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Detail {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ID: number;

  @OneToOne(() => Product_State)
  @JoinColumn()
  @Field(() => Product_State)
  PRODUCTSTATE: Product_State;

  @Column('double', { nullable: true })
  @Field(() => Float, { nullable: true })
  SERVING_SIZE: number;

  @Column('double', { nullable: true })
  @Field(() => Float, { nullable: true })
  CAFFEIN: number;

  @Column('double', { nullable: true })
  @Field(() => Float, { nullable: true })
  CALORIE: number;

  @Column('double', { nullable: true })
  @Field(() => Float, { nullable: true })
  NATRIUM: number;

  @Column('double', { nullable: true })
  @Field(() => Float, { nullable: true })
  SUGARS: number;

  @Column('double', { nullable: true })
  @Field(() => Float, { nullable: true })
  SATURATED_FAT: number;

  @Column('double', { nullable: true })
  @Field(() => Float, { nullable: true })
  PROTEIN: number;

  @Column()
  @Field(() => Int)
  PRICE: number;

  @DeleteDateColumn()
  DELETEAT: Date;
}
