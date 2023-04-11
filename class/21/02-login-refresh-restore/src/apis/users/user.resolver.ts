import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';

import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ email, hashPassword, name, age });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  async fetchUser(@CurrentUser() CurrentUser: any) {
    console.log(CurrentUser);
    return 'fetchUSer 실행';
  }
}
