import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_State } from '../productState/entities/productState.entity';
import { Image } from './entities/image.entity';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Product_State])],
  providers: [ImageResolver, ImageService],
})
export class ImageModule {}
