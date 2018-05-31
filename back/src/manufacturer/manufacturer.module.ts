import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { Manufacturer } from '../entities/Manufacturer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer])],
  components: [ManufacturerService],
  controllers: [ManufacturerController],
})
export class ManufacturerModule {}