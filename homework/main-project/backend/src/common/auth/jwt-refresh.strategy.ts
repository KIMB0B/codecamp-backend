import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        if (req.headers.cookie) {
          const cookies = req.headers.cookie.split('; ');
          const refreshToken = cookies.find((cookie) =>
            cookie.startsWith('refreshToken='),
          );
          return refreshToken
            ? refreshToken.replace('refreshToken=', '')
            : null;
        }
      },
      secretOrKey: 'refreshKey',
    });
  }

  validate(payload) {
    return payload;
  }
}
