import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.strategy';
import { GoogleStrategy } from 'src/common/auth/social-google.strategy';
import { AuthController } from './auth.controller';
import { NaverStrategy } from 'src/common/auth/social-naver.strategy';
import { KakaoStrategy } from 'src/common/auth/social-kakao.strategy';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtRefreshStrategy,
    GoogleStrategy,
    NaverStrategy,
    KakaoStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
