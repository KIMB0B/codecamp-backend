import { ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  descroption: string;
  @Column()
  price: number;
  @Column()
  isSoldOut: boolean;

  @JoinColumn() // 1:1관계
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory) // N:1관계
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable() // N:M관계
  @ManyToMany(() => ProductTag, (productTags) => productTags.product)
  productTags: ProductTag[];
}
