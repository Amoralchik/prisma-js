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
    return prisma.todo.findMany({
      where: { id: todo_id },
    });
  }
  async create({
    todo_title,
    list_id,
  }: {
    todo_title: string;
    list_id: number;
  }) {
    return prisma.todo.create({
      data: {
        done: false,
        due_date: new Date(),
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

  async updateDone(todo_id, { done }: { done: boolean }) {
    return prisma.todo.update({
      data: { done },
      where: { id: todo_id },
    });
  }
  async updateTitle(todo_id, { title }: { title: string }) {
    return prisma.todo.update({
      data: { title },
      where: { id: todo_id },
    });
  }
  async updateDate(todo_id, { due_date }: { due_date: string }) {
    return prisma.todo.update({
      data: { due_date: new Date(due_date) },
      where: { id: todo_id },
    });
  }
  async updateTodosList(todo_id, { lists_id }: { lists_id: number }) {
    return prisma.todo.update({
      data: { lists_id },
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
