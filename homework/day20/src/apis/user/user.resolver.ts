import * as bcrypt from 'bcrypt';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser } from 'src/common/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  fetchLoginUser(@CurrentUser() currentUser: any) {
    const EMAIL = currentUser.EMAIL;
    return this.userService.findOneWithEmail({ EMAIL });
  }

  @Mutation(() => User)
  async createUser(
    @Args('EMAIL') EMAIL: string,
    @Args('PASSWORD') PASSWORD: string,
    @Args('NAME') NAME: string,
    @Args('AGE') AGE: number,
  ) {
    const HashedPassword = await bcrypt.hash(PASSWORD, 10);

    return this.userService.create({ EMAIL, HashedPassword, NAME, AGE });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async updateUserPwd(
    @Args('EMAIL') EMAIL: string,
    @Args('PASSWORD') PASSWORD: string,
  ) {
    const HashedPassword = await bcrypt.hash(PASSWORD, 10);
    return this.userService.update({ EMAIL, HashedPassword });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteLoginUser(@Args('EMAIL') EMAIL: string) {
    return this.userService.delete({ EMAIL });
  }

  @Mutation(() => Boolean)
  async restoreUser(
    @Args('EMAIL') EMAIL: string,
    @Args('PASSWORD') PASSWORD: string,
  ) {
    const user = await this.userService.findOneWithDeleted({ EMAIL });

    if (!user)
      throw new UnprocessableEntityException(
        '가입되어 있지 않은 사용자입니다.',
      );

    if ((await bcrypt.compare(PASSWORD, user.PASSWORD)) == false)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다');

    return this.userService.restore({ EMAIL });
  }
}
