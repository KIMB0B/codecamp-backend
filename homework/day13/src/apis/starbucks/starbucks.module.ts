import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starbucks } from './entities/starbucks.entity';
import { StarbucksResolver } from './starbucks.resolver';
import { StarbucksService } from './starbucks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Starbucks])],
  providers: [StarbucksService, StarbucksResolver],
})
export class StarbucksModule {}
