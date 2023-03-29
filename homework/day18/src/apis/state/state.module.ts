import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../image/entities/image.entity';
import { Product_State } from '../productState/entities/productState.entity';
import { State } from './entities/state.entity';
import { StateResolver } from './state.resolver';
import { StateService } from './state.service';

@Module({
  imports: [TypeOrmModule.forFeature([State, Product_State, Image])],
  providers: [StateResolver, StateService],
})
export class StateModule {}
