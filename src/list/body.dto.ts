import { ApiProperty } from '@nestjs/swagger';

export class TodoDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  done: boolean;
  @ApiProperty()
  due_date: string;
  @ApiProperty()
  lists_id: number;
  @ApiProperty()
  desc: string;
}
