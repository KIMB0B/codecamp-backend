import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { State } from './entities/state.entity';
import { StateService } from './state.service';

@Resolver()
export class StateResolver {
  constructor(private readonly stateService: StateService) {}

  @Query(() => [State])
  fetchStates() {
    return this.stateService.findAll();
  }

  @Query(() => State)
  fetchState(@Args('stateId') stateId: string) {
    return this.stateService.findById({ stateId });
  }

  @Query(() => State)
  fetchStateByName(@Args('name') name: string) {
    return this.stateService.findByName({ name });
  }

  @Query(() => [State])
  fetchStatesWithDeleted() {
    return this.stateService.findAllWithDeleted();
  }

  @Mutation(() => State)
  createState(@Args('name') name: string) {
    return this.stateService.create({ name });
  }

  @Mutation(() => State)
  updateState(@Args('stateId') stateId: string, @Args('name') name: string) {
    return this.stateService.update({ stateId, name });
  }

  @Mutation(() => Boolean)
  deleteState(@Args('stateId') stateId: string) {
    return this.stateService.delete({ stateId });
  }

  @Mutation(() => Boolean)
  restoreState(@Args('stateId') stateId: string) {
    return this.stateService.restore({ stateId });
  }
}
