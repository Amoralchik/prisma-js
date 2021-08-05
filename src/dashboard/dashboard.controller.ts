import { Controller, Get } from '@nestjs/common';
import prisma from '../prisma';

@Controller('dashboard')
export class DashboardController {
  @Get()
  getDashboard() {
    return prisma.$queryRaw(
      "SELECT list_name,list_id,count(*) FROM todo RIGHT JOIN lists ON todo.lists_id = lists.list_id WHERE due_date BETWEEN CURRENT_DATE AND '2021-08-08' AND done=false GROUP BY list_id ",
    );
  }
}
