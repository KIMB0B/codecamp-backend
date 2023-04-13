import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    if (user) {
      return this.jwtService.sign(
        { EMAIL: user.EMAIL, AGE: user.AGE, SUB: user.ID },
        { secret: 'accessKey', expiresIn: '1h' },
      );
    } else {
      throw new ConflictException('로그인이 되어있지 않습니다.');
    }
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { EMAIL: user.EMAIL, AGE: user.AGE, SUB: user.ID },
      { secret: 'refreshKey', expiresIn: '2w' },
    );

    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; SameSite=None; Secure`,
    );
  }
}
