import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { StateResolver } from './state.resolver';
import { StateService } from './state.service';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateResolver, StateService],
})
export class StateModule {}
