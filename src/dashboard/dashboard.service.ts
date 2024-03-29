import { Injectable } from '@nestjs/common';
import prisma from '../prisma';

@Injectable()
export class DashboardService {
  async getDate(date: string) {
    const fixedDate = new Date(date);

    fixedDate.setHours(fixedDate.getHours() + 3);

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
                  {
                    due_date: { gte: new Date(fixedDate.toDateString()) },
                  },
                  { due_date: { lte: fixedDate } },
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

  async getTodayCount() {
    const fixedDate = new Date();

    fixedDate.setHours(fixedDate.getHours() + 3);

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
                  {
                    due_date: { gte: new Date(`${fixedDate.toDateString()}`) },
                  },
                  { due_date: { lte: fixedDate } },
                ],
              },
              { done: false },
            ],
          },
        },
      },
    });

    let count = 0;

    list.forEach((obj) => (count += obj.todo.length));

    return count;
  }

  async getDashboard() {
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
            done: false,
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
