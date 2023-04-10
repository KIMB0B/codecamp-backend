import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_State } from '../productState/entities/productState.entity';
import { DetailResolver } from './detail.resolver';
import { DetailService } from './detail.service';
import { Detail } from './entities/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detail, Product_State])],
  providers: [DetailResolver, DetailService],
})
export class DetailModule {}
