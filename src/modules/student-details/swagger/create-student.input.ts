
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../model/address.schema';
import { Course } from '../model/course.schema';

export class CreateStudentInput {
  
  @ApiProperty({
    example: '3014',
    description: 'Student Register number',
  })
  regNo: string;

  @ApiProperty({
    example: 'Kiran',
    description: 'Student name',
  })
  studentName: string;

/*
  @ApiProperty({
    description: 'Student Course',
    type: [Course],
  })
  course: Course;
*/
@ApiProperty({
  example: { courseName: 'MCA', duration: '3 Years' },
  description: 'Student Course Details',
})
course: unknown;


  @ApiProperty({
    description: 'Student Address',
    type: [Address],
  })
  address: Address[];


}
