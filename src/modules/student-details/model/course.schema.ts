
import { ApiProperty } from '@nestjs/swagger';

export class Course{

  @ApiProperty({ example: 'MCA', description: 'Course Name' })
  courseName: string;

  @ApiProperty({ example: '3 Years', description: 'Duration' })
  duration: string;

}
