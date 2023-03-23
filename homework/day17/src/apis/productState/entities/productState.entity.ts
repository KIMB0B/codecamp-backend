import { Product } from 'src/apis/product/entities/product.entity';
import { State } from 'src/apis/state/entities/state.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product_State {
  @PrimaryGeneratedColumn('uuid')
  ID: number;

  @ManyToOne(() => Product)
  P: Product;

  @ManyToOne(() => State)
  S: State;
}
