import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { EMAIL: user.EMAIL, AGE: user.AGE, SUB: user.ID },
      { secret: 'accessKey', expiresIn: '1h' },
    );
  }
}
