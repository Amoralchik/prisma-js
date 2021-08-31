import { Injectable } from '@nestjs/common';
import prisma from '../prisma';

@Injectable()
export class CollectionService {
  async getToday() {
    const fixedDate = new Date(new Date().toDateString());
    const date = new Date();
    date.setDate(date.getDate() + 1);

    fixedDate.setHours(fixedDate.getHours() + 3);
    return await prisma.todo.findMany({
      include: {
        lists: true,
      },

      where: {
        AND: [
          { due_date: { gt: new Date(fixedDate.toDateString()) } },
          { due_date: { lt: date } },
        ],
      },
    });
  }
  async getTomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return await prisma.todo.findMany({
      include: {
        lists: true,
      },
      where: { due_date: date },
    });
  }
}
