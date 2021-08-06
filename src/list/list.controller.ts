import {
  ParseBoolPipe,
  ParseIntPipe,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { TodoDTO } from './body.dto';
('./body.dto.ts');
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
  create(@Param('id') id, @Body() { title, date }) {
    return this.listService.create({
      list_id: Number(id),
      todo_title: title,
      todo_date: date,
    });
  }

  @Delete('/:id')
  delete(@Param('id') id) {
    return this.listService.remove(Number(id));
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body()
    patchTodo: TodoDTO,
  ) {
    return this.listService.update(id, {
      done: patchTodo.done,
      due_date: patchTodo.due_date,
      title: patchTodo.title,
      lists_id: patchTodo.lists_id,
    });
  }

  @Put('/:id')
  @ApiBody({ type: [TodoDTO] })
  putUpdate(@Param('id') id, @Body() patchTodo: TodoDTO) {
    return this.listService.putUpdate(Number(id), {
      title: patchTodo.title,
      done: patchTodo.done,
      due_date: patchTodo.due_date,
      lists_id: patchTodo.lists_id,
    });
  }
}
