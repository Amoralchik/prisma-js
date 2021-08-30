import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/today')
  async getDashboardToday(@Query('date') date) {
    return this.dashboardService.getToday(date);
  }
  @Get('/')
  async getDashboard() {
    return this.dashboardService.get();
  }
}
