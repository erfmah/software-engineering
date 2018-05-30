import * as jwt from 'jsonwebtoken';
import { Component, Query, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Component()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async createToken(user) {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const toCode = { phone: user.phone };
    const token = jwt.sign(toCode, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    if (signedUser['phone']) {
      let user = await this.userService.findByPhone(signedUser['phone']);
      if (user) {        
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}