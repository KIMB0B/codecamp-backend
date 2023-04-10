import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_State } from './entities/productState.entity';
import { ProductStateResolver } from './productState.resolver';
import { ProductStateService } from './productState.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product_State])],
  providers: [ProductStateResolver, ProductStateService],
})
export class ProductStateModule {}
