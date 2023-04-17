import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { differenceInYears } from 'date-fns';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: 'http://localhost:4000/login/kakao',
    });
  }

  validate(accessToken, refreshToken, profile) {
    return {
      EMAIL: profile._json.kakao_account.email,
      PASSWORD: profile.id,
      // 이름과 생년월일 가져오는게 안됨
      NAME: 'kakao',
      AGE: 0,
    };
  }
}
