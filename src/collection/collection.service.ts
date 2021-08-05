import { Injectable } from '@nestjs/common';
import prisma from '../prisma';

@Injectable()
export class CollectionService {
  async getToday() {
    const todos = await prisma.todo.findMany({
      include: {
        lists: true,
      },
      where: { due_date: new Date() },
    });
    return todos.map(
      ({ title, done, due_date, id, lists: { list_name }, lists_id }) => {
        return { title, done, due_date, id, list_name, lists_id };
      },
    );
  }
  async getTomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const todos = await prisma.todo.findMany({
      include: {
        lists: true,
      },
      where: { due_date: date },
    });
    return todos.map(
      ({ title, done, due_date, id, lists: { list_name }, lists_id }) => {
        return { title, done, due_date, id, list_name, lists_id };
      },
    );
  }
}
