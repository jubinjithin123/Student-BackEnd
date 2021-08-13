import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UtilityService } from '../../services';
import { StudentDetailsRepository} from './student-details.repository';
import { Student,StudentDocument } from './model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    CreateStudentDto,
    CreateStudentResponse,
    StudentsResponse,
    StudentResponse
} from './dto';

@Injectable()
export class StudentDetailsService {
    constructor(
        private readonly studentDetailsRepository: StudentDetailsRepository,
        private readonly utilitySerive: UtilityService,
        @InjectModel(Student.name)
        private StudentDocumentModel: Model<StudentDocument>,
      ) {}


  // @function createStudentDetails   

  async createStudentDetails(
    createStudentDto: CreateStudentDto,
  ): Promise<CreateStudentResponse> {
    if (
      typeof createStudentDto === 'undefined' ||
      this.utilitySerive.isObjectEmpty(createStudentDto)
    ) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } else {
     // createAccountheadDto.status = 1;
     // createAccountheadDto.createdOn = new Date();
      const student: Student= await this.studentDetailsRepository.createStudentDetails(
        createStudentDto,
      );
      return {
        status: HttpStatus.CREATED,
        result: {
          //id: accountHead.id,
          regNo: student.regNo,
        },
        message: 'Student Details created successfully',
      };
    }
  }


    /**
   * @function getStudentsDetails
   * @description get all Students Details
   */
     async getStudentsDetails(): Promise<StudentsResponse> {
      const students: Student[] = await this.studentDetailsRepository.getStudentsDetails();
      return {
        status: HttpStatus.OK,
        result: students,
        message: 'Students Details fetched successfully',
      };
    }



    /**
   * @function getStudentDetails
   * @description get Student Details using regNo:
   */
  async getStudentDetailsByregNo(
    regNo: string,
  ): Promise<StudentResponse> {
    if (String(regNo).length < 3 || typeof regNo === 'undefined') {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const student: Student = await this.studentDetailsRepository.getStudentDetailsByregNo(
      regNo,
    );
    return {
      status: HttpStatus.OK,
      result: student,
      message: 'Student Details fetched successfully',
    };
  }

   /**
   * @function getStudentDetailsBYName
   * @description get Student Details using By studentName
   */
    async getStudentDetailsBYName(
      studentName: string,
    ): Promise<StudentResponse> {
      if (String(studentName).length < 3 || typeof studentName === 'undefined') {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      const student: Student = await this.studentDetailsRepository.getStudentDetailsBYName(
        studentName,
      );
      return {
        status: HttpStatus.OK,
        result: student,
        message: 'Student Details fetched successfully',
      };
    }


   /**
   * @function updateStudentDetails
   * @description Update Student Details
   */

         async updateStudentDetails(
          modifyStudentDto: CreateStudentDto
        ): Promise<CreateStudentResponse> {
          const student: Student = await this.studentDetailsRepository.getStudentDetailsForUpdt(
            modifyStudentDto.regNo,
          );
         
          // assign the user input to Student object         
          let updated = Object.assign(student, modifyStudentDto);
     
        //  customer.createdBy = customer.createdBy;
        //  customer.modifiedOn = new Date();
          const studentModify: Student = await this.studentDetailsRepository.updateStudentDetails(
            updated);
                  
          return {
            status: HttpStatus.CREATED,
            result: studentModify,
            message: 'Student Details Successfully Updated !!!!!',
          };
        }






}
