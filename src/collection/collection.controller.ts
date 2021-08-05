import { Controller, Get } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get('/today')
  getToday() {
    return this.collectionService.getToday();
  }
  @Get('/tomorrow')
  getTomorrow() {
    return this.collectionService.getTomorrow();
  }
}
