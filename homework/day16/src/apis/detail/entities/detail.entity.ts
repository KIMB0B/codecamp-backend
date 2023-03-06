import { Product_State } from 'src/apis/productState/entities/productState.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Detail {
  @JoinColumn()
  @OneToOne(() => Product_State, { primary: true })
  PS: Product_State;

  @Column('double')
  SERVING_SIZE: number;

  @Column('double')
  CAFFEIN: number;

  @Column('double')
  CALORIE: number;

  @Column('double')
  NATRIUM: number;

  @Column('double')
  SUGARS: number;

  @Column('double')
  SATURATED_FAT: number;

  @Column('double')
  PROTEIN: number;

  @Column()
  PRICE: number;
}
