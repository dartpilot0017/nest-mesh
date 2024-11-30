/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY||'6PAOIeoalwiU+QJaMQa6pSrOqrFcde7waotpz4cCjkI=', // use your secret key or environment variable
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };  // Adjust the returned values based on your payload
  }
}

