import { Put } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/:id')
  getAll(@Param('id') id) {
    return this.listService.getAll(Number(id));
  }

  @Get('/todo/:id')
  getOne(@Param('id') id) {
    return this.listService.getOne(Number(id));
  }

  @Post('/:id')
  create(@Param('id') id, @Body('title') title) {
    return this.listService.create({ list_id: Number(id), todo_title: title });
  }

  @Delete('/:id')
  delete(@Param('id') id) {
    return this.listService.remove(Number(id));
  }

  @Patch('/:id/date')
  updateDate(@Param('id') id, @Body() patchTodo: { date }) {
    return this.listService.updateDate(Number(id), {
      due_date: patchTodo.date,
    });
  }
  @Patch('/:id/done')
  updateDone(@Param('id') id, @Body() patchTodo: { done }) {
    return this.listService.updateDone(Number(id), {
      done: JSON.parse(patchTodo.done),
    });
  }
  @Patch('/:id/list')
  update(@Param('id') id, @Body() patchTodo: { list }) {
    return this.listService.updateTodosList(Number(id), {
      lists_id: Number(patchTodo.list),
    });
  }
  @Patch('/:id/title')
  updateTitle(@Param('id') id, @Body() patchTodo: { title }) {
    return this.listService.updateTitle(Number(id), {
      title: patchTodo.title,
    });
  }

  @Put('/:id')
  putUpdate(@Param('id') id, @Body() patchTodo: { title; done; date; listId }) {
    return this.listService.putUpdate(Number(id), {
      title: patchTodo.title,
      done: Boolean(patchTodo.done),
      due_date: patchTodo.date,
      lists_id: Number(patchTodo.listId),
    });
  }
}
