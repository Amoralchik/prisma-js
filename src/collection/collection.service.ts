import { Injectable } from '@nestjs/common';
import prisma from '../prisma';

@Injectable()
export class CollectionService {
  async getToday() {
    return await prisma.todo.findMany({
      include: {
        lists: true,
      },

      where: { due_date: new Date() },
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
