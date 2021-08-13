import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { StudentDetailsClient } from './student-details.client';
import { Student,StudentDocument } from './model';
import {
    CreateStudentDto,
    CreateStudentResponse,
    StudentsResponse,
    StudentResponse
} from './dto';
import { UtilityService } from '../../services/utility.service';


@Injectable()
export class StudentDetailsRepository {
    constructor(
        private readonly studentDetailsClient: StudentDetailsClient,
        private readonly utilityService: UtilityService,
      ) {}


 // @function createStudentDetails
  async createStudentDetails(
    createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    try {
      return await this.studentDetailsClient.createStudentDetails(
        createStudentDto,
      );
    } catch (error: any) {
      if (String(error).includes('E11000')) {
        throw new HttpException('Duplicate Entry', HttpStatus.CONFLICT);
      }
    }
  }
    
 /**
   * @function getStudentsDetails
   * @description get all Students Details
   */
  async getStudentsDetails(): Promise<Student[]> {
    return await this.studentDetailsClient.getStudentsDetails();
  }


    /**
   * @function getStudentDetails
   * @description get Student Details using regNo:
   */
     async getStudentDetailsByregNo(regNo: string): Promise<Student> {
      const student: Student = await this.studentDetailsClient.getStudentDetailsByregNo(
        regNo,
      );
      if (this.utilityService.isObjectEmpty(student)) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return student;
    }

 /**
   * @function getStudentDetailsForUpdt
   * @description get Student Details for Updation
  */
  async getStudentDetailsForUpdt(regNo: string): Promise<Student> {        
    const student: Student = await this.studentDetailsClient.getStudentDetailsForUpdt(
      regNo,
    );
   // console.log(student);
    if (this.utilityService.isObjectEmpty(student)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return student;
  }



  /**
   * @function getStudentDetailsBYName
   * @description get Student Details using By studentName
   */
   async getStudentDetailsBYName(studentName: string): Promise<Student> {
    const student: Student = await this.studentDetailsClient.getStudentDetailsBYName(
      studentName,
    );
    if (this.utilityService.isObjectEmpty(student)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return student;
  }


  /**
   * @function updateStudentDetails
   * @description Update Student Details
  */
    async updateStudentDetails(modifiedStudentDto: Student): Promise<Student> {
      const student: Student = await this.studentDetailsClient.updateStudentDetails(
        modifiedStudentDto,
      );
      if (this.utilityService.isObjectEmpty(student)) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return student;
    }






}