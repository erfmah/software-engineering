import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class SecureMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (req.session.user) {
        next();
      } else {
        res.redirect('/user/login')
      }
      
    };
  }
}