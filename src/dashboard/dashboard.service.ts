import { Injectable } from '@nestjs/common';
import prisma from '../prisma';

@Injectable()
export class DashboardService {
  async getToday(date: string) {
    const list = await prisma.lists.findMany({
      select: {
        list_id: true,
        list_name: true,
        todo: {
          select: {
            due_date: true,
            id: true,
          },
          where: {
            AND: [
              {
                AND: [
                  { due_date: { gte: new Date() } },
                  { due_date: { lte: new Date(date) } },
                ],
              },
              { done: false },
            ],
          },
        },
      },
    });

    const result = list.map((obj) => {
      return {
        list_id: obj.list_id,
        list_name: obj.list_name,
        count: obj.todo.length,
      };
    });

    return result;
  }
}
