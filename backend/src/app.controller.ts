import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Tile } from './ingestor/entities/tile.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/tiledata')
  findAll(): Promise<Array<Tile>> {
    return this.appService.findAll();
  }

  @Get('/timecapsule')
  getFirstTilesWithImages() {
    return this.appService.getFirstTilesWithImages();
  }
}
