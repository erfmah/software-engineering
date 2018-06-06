import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus, UseInterceptors, FileInterceptor, FilesInterceptor, UploadedFile, UploadedFiles     } from '@nestjs/common';
import { ImageService } from './image.service';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  
  @Post('create')
  @UseInterceptors(FilesInterceptor('images'))
  async createImages(@Body() data, @Res() res, @UploadedFiles() files): Promise<any> {
    console.log(files)
    return
    let data_of = await this.imageService.create(data['alt'], data['path'], files);
    if (data_of != null) {
        let result = {};
        result['data'] = {};
        result['data'] = data_of;
        result['status'] = "success";
        res.status(HttpStatus.OK).json(result);
    } else {
        let result = {};
        result['data'] = {};
        result['status'] = "failed";
        res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file): Promise<any> {
    fs.writeFileSync(file.originalname, file.buffer)

  }

}