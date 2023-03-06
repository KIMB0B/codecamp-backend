import { Category } from 'src/apis/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  ID: number;
  @ManyToOne(() => Category)
  C: Category;
  @Column()
  KOR_NAME: string;
  @Column()
  ENG_NAME: string;
  @Column()
  EXPLANATION: string;
}
