import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { AtStrategy } from './at.strategy';
import { RtStrategy } from './rt.strategy';

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , AtStrategy , RtStrategy]
})
export class AuthModule {}
