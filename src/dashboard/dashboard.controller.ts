import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/')
  async getDashboard(@Query('date') date) {
    return this.dashboardService.getToday(date);
  }
}
