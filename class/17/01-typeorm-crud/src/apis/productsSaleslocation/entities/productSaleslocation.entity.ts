import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => Float)
  lat: number;

  @Column()
  @Field(() => Float)
  lag: number;

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
