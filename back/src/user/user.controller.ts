import { Render, Controller, Get, UseGuards, Post, Body, Res, HttpStatus, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get('login')
  @Render('login')
  loginRender() {

  }

  @Post('create')
  async createUser(@Body() data, @Res() res): Promise<any> {
    if (data['password'] != data['password_r']) {
        let result = {};
        result['data'] = {};
        result['status'] = "password_r_doenst_match";
        res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else {
        let user_already = await this.userService.findByPhone(data['phone'])
        if (user_already) {
            let result = {};
            result['data'] = {};
            result['status'] = "user_already_exist";
            res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
        } else {
            let data_of = await this.userService.createUser(data);
            if (data_of != null) {
                let result = {};
                result['data'] = {};
                result['data']['user'] = data_of;
                result['data']['token_data'] = await this.authService.createToken(data_of);
                result['status'] = "success";
                res.status(HttpStatus.OK).json(result);
            } else {
                let result = {};
                result['data'] = {};
                result['status'] = "failed";
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
            }
        }
    }
  }
  @Post('login')
  async login(@Body() data, @Res() res): Promise<any> {
    
      let result = {};
      let code;
	  if (data['phone'] && data['password']) {
          let authed = await this.userService.authorize(data['phone'], data['password']);
          if (!authed) {
            result['data'] = {};
            result['status'] = "user_not_found_or_wrong_password";
            code = HttpStatus.FORBIDDEN;
          } else {
              let user = await this.userService.findByPhone(data['phone']);
              result['data'] = {}
              const user_data_to_send = {email:user.email, firstName:user.firstName, lastName:user.lastName}
              result['data']['user'] = user_data_to_send;
              result['data']['token_data'] = await this.authService.createToken(user);
              result['status'] = "success";
              code = HttpStatus.OK;
          }
	  } else {
		    result['data'] = {};
        result['status'] = "bad_request";
        code = HttpStatus.BAD_REQUEST;
      }
      
      res.status(code).json(result);
  }

  @Post('addAddress')
  async addAddress(@Body() data, @Res() res, @Req() req): Promise<any> {
    let address = await this.userService.addAddress(data['city'], data['address'], data['zip'], data['phone'],req.user.user.id)
    if(address == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "address_already_exist_in_user_information";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['address'] = address;
      console.log(address)
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }

  @Post('removeAddress')
  async removeAddress(@Body() data, @Res() res): Promise<any> {
    let address = await this.userService.removeAddress(data['id'])
    if(address == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "address_does_not_exist_in_repository";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['address'] = address;
      console.log(address)
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }
  


}