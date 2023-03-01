import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';

@Entity()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  address: string;
  @Column()
  addressDetail: string;
  @Column()
  lat: number;
  @Column()
  lag: number;
  @Column()
  meetingTime: Date;
}
