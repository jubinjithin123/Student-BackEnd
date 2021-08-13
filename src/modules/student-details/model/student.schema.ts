import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';
//import { Course } from './course.schema';

export type StudentDocument = Student & Document;

export class Course {
  courseName: string;
  duration: string;
}

@Schema()
export class Student {

  @Prop({ required: true , unique:true})
  regNo: string;

  @Prop({ required: true })
  studentName: string;

/*
  @Prop({ required: true, type: Course })
  course: Course; */

  @Prop({ required: true })
  course: Course;


  @Prop({ required: true, type: Address })
  address: Address[];

}

export const StudentSchema = SchemaFactory.createForClass(Student);
