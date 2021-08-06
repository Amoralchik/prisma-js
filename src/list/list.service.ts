import { Injectable } from '@nestjs/common';
import prisma from '../prisma';

type updateParams = {
  done: boolean;
  due_date: string;
  title: string;
  lists_id: number;
};

@Injectable()
export class ListService {
  async getAll(id) {
    return prisma.todo.findMany({
      where: { lists_id: id },
    });
  }
  async getOne(todo_id) {
    return prisma.todo.findFirst({
      where: { id: todo_id },
    });
  }
  async create({
    todo_title,
    list_id,
    todo_date,
  }: {
    todo_title: string;
    list_id: number;
    todo_date: string;
  }) {
    return prisma.todo.create({
      data: {
        done: false,
        due_date: new Date(todo_date),
        title: todo_title,
        lists_id: list_id,
      },
    });
  }
  async remove(todo_id) {
    return prisma.todo.delete({
      where: { id: todo_id },
    });
  }

  async update(todo_id, { due_date, lists_id, done, title }) {
    const fixedObject = {};

    if (due_date !== undefined) {
      fixedObject['due_date'] = new Date(due_date);
    }
    if (title !== undefined) {
      fixedObject['title'] = title;
    }
    if (lists_id !== undefined) {
      fixedObject['lists_id'] = Number(lists_id);
    }

    if (done !== undefined) {
      fixedObject['done'] = JSON.parse(done);
    }

    return prisma.todo.update({
      data: { ...fixedObject },
      where: { id: todo_id },
    });
  }

  async putUpdate(todo_id, { done, due_date, title, lists_id }: updateParams) {
    return prisma.todo.update({
      data: { done, due_date: new Date(due_date), title, lists_id },
      where: { id: todo_id },
    });
  }
}
