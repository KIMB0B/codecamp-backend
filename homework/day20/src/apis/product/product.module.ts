import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Product_State } from '../productState/entities/productState.entity';
import { State } from '../state/entities/state.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, State, Product_State]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
