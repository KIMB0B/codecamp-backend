import * as bcrypt from 'bcrypt';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/auth/gql-user.param';
import { GqlAuthRefreshGuard } from 'src/common/auth/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('EMAIL') EMAIL: string,
    @Args('PASSWORD') PASSWORD: string,
    @Context() context: any,
  ) {
    const user = await this.userService.findOneWithEmail({ EMAIL });

    if (!user)
      throw new UnprocessableEntityException(
        '가입되어 있지 않은 사용자입니다.',
      );

    if ((await bcrypt.compare(PASSWORD, user.PASSWORD)) == false)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    this.authService.setRefreshToken({ user, res: context.req.res });

    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: any) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
