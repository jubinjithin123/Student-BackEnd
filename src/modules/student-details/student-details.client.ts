import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Student,StudentDocument } from './model';
import {
    CreateStudentDto,
    CreateStudentResponse,
    StudentsResponse,
    StudentResponse
} from './dto';

@Injectable()
export class StudentDetailsClient {
    constructor(
      @InjectModel(Student.name)
        private StudentDocumentModel: Model<StudentDocument>,
      ) {}

  
   // @function createStudentDetails
   async createStudentDetails(
    createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    const createdStudentDto = new this.StudentDocumentModel(createStudentDto);
    return createdStudentDto.save();
  }


    /**
   * @function getStudentsDetails
   * @description get all Students Details
    */
     async getStudentsDetails(): Promise<Student[]> {
      return await this.StudentDocumentModel.find().limit(50).exec();
    }



  /**
   * @function getStudentDetails
   * @description get Student Details using regNo:
   */

    async getStudentDetailsByregNo(regNo: string): Promise<any> {
    let stringArray = [];
    stringArray = regNo.split(' ');
    return await this.StudentDocumentModel
      .find({
        regNo: new RegExp(stringArray[0], 'i'),
      })
      .limit(50)
      .exec();
  }

  /**
   * @function getStudentDetailsForUpdt
   * @description get Student Details for Updation
  */
   async getStudentDetailsForUpdt(regNo: string): Promise<Student> {
    return await this.StudentDocumentModel.findOne({ regNo: regNo }).exec();
  }




  /**
   * @function getStudentDetailsBYName
   * @description get Student Details using By studentName
  */
     async getStudentDetailsBYName(studentName: string): Promise<any> {
      let stringArray = [];
      stringArray = studentName.split(' ');
      return await this.StudentDocumentModel
        .find({
          studentName: new RegExp(stringArray[0], 'i'),
        })
        .limit(50)
        .exec();
    }


  /**
    * @function updateStudentDetails
    * @description Update Student Details
   */
       async updateStudentDetails(modifiedStudentDto): Promise<Student> {     
        modifiedStudentDto.save();
        return modifiedStudentDto;
      }





}