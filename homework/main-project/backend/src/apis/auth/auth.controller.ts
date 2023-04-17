import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common/decorators';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';

interface IOAuthUser {
  user: Pick<User, 'EMAIL' | 'PASSWORD' | 'NAME' | 'AGE'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async socialLogin(req: Request & IOAuthUser, res: Response) {
    // 1. 가입확인
    let user = await this.userService.findOneWithEmail({
      EMAIL: req.user.EMAIL,
    });
    // 2. 회원가입
    if (!user) {
      user = await this.userService.create({
        EMAIL: req.user.EMAIL,
        HashedPassword: req.user.PASSWORD,
        NAME: req.user.NAME,
        AGE: req.user.AGE,
      });
    }
    // 3. 로그인
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/homework/main-project/frontend/login/index.html',
    );
  }

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.socialLogin(req, res);
  }

  @Get('login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.socialLogin(req, res);
  }

  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.socialLogin(req, res);
  }
}
