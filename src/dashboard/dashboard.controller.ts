import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/date')
  async getDashboardToday(@Query('date') date) {
    return this.dashboardService.getDate(date);
  }

  @Get('/todayCount')
  async getCount() {
    return this.dashboardService.getTodayCount();
  }

  @Get('/')
  async getDashboard() {
    return this.dashboardService.getDashboard();
  }
}
