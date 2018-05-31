import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus     } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}
  
  @Post('create')
  async createManufacturer(@Body() data, @Res() res): Promise<any> {
    let manufacturer_already = await this.manufacturerService.findByName(data ['name'])
    if(manufacturer_already) {
      let result = {};
      result['data'] = {};
      result['status'] = "manufacturer_already_exist";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else {
      let data_of = await this.manufacturerService.createManufacturer(data);
      if(data_of != null) {
        let result = {};
        result['data'] = {};
        result['data']['manufacturer'] = data_of;
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