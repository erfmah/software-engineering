import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Component()
export class LocalStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        secretOrKey: 'secret'
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }

  public async verify(req, payload, done) {
    const user = await this.authService.validateUser(payload);
    if (user) { 
      return done(null, payload);
    } else {
      return done('Unauthorized', false);
    }
    
  }
}