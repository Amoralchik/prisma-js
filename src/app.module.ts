import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { CollectionController } from './collection/collection.controller';
import { ListController } from './list/list.controller';
import { CollectionService } from './collection/collection.service';
import { ListService } from './list/list.service';
import { DashboardService } from './dashboard/dashboard.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    DashboardController,
    CollectionController,
    ListController,
  ],
  providers: [AppService, CollectionService, ListService, DashboardService],
})
export class AppModule {}
