import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';
import { differenceInYears } from 'date-fns';

export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/login/naver',
    });
  }

  validate(accessToken, refreshToken, profile) {
    const birthday = new Date(`${profile.birthyear}-${profile.birthday}`);

    const age = birthday ? differenceInYears(new Date(), birthday) + 1 : null;

    return {
      EMAIL: profile.email,
      PASSWORD: profile.id,
      NAME: profile.name,
      AGE: age,
    };
  }
}
