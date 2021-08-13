import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';
import { Address } from '../model/address.schema';
import { Course } from '../model/course.schema';

export class CreateStudentDto { 

  @IsString()
  readonly regNo: string;

  @IsString()
  readonly studentName: string;

  course: any;

  address: Address[];


}
