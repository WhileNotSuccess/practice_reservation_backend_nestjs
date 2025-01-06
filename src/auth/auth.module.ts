import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from 'src/user/user.module';
import { SessionSerializer } from './session.serializer';

@Module({
  imports:[UserModule,PassportModule.register({session:true})],
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy,SessionSerializer],
})
export class AuthModule {}
