import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';

// import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>("secretKey"),
                signOptions: { expiresIn: "30s"}
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
