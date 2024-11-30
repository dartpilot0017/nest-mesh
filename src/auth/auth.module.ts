/* eslint-disable prettier/prettier */
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Connect User entity to TypeORM
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY||'6PAOIeoalwiU+QJaMQa6pSrOqrFcde7waotpz4cCjkI=',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Export AuthService for use in other modules
})
export class AuthModule {}
