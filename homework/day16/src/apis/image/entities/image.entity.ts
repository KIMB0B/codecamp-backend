import { Product_State } from 'src/apis/productState/entities/productState.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Image {
  @JoinColumn()
  @OneToOne(() => Product_State, { primary: true })
  PS: Product_State;

  @Column()
  URL: string;
}
