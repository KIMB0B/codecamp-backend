import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '15s' },
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

    // // 배포환경
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=mybacksite.com; SameSite=None; Secure; httpOnly`,
    // );
  }
}
