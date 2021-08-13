import {
    Controller,Post,Get,Put,Delete,Param,
    Body,NotFoundException,HttpStatus,HttpCode,
  } from '@nestjs/common';

  import {
    ApiBearerAuth,ApiOperation,ApiResponse,
    ApiTags,ApiBody,
  } from '@nestjs/swagger';

  import { StudentDetailsService } from './student-details.service';
  import { LoggerService } from '../../services';
  import {
    CreateStudentDto,
    CreateStudentResponse,
    StudentsResponse,
    StudentResponse
  } from './dto';
  import { CreateStudentInput } from './swagger';

@ApiBearerAuth()
@ApiTags('StudentDetails') 
@Controller('student-details')
export class StudentDetailsController {
     constructor(
      private readonly studentDetailsService: StudentDetailsService, 
      private readonly loggerService: LoggerService,    
      ) {}

 /**
   * @function getStudentsDetails
   * @description get all Students Details
    */
  @Get('/getStudentsDetails')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get the list of All Students Details' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfull',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  async getStudentsDetails(): Promise<StudentsResponse> {
    try {
      return await this.studentDetailsService.getStudentsDetails();
    } catch (error) {
      this.loggerService
        .getLogger()
        .error(
          `Students Details Controller :: Students Details error: ${JSON.stringify(
            error,
          )}`,
        );
      const errStatus: number = error.status;
      let response: any;
      switch (errStatus) {
        case HttpStatus.BAD_REQUEST: {
          response = {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
          };
          break;
        }
        default: {
          response = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: JSON.stringify(error),
          };
          break;
        }
      }
      return response;
    }
  }

  
// @function createStudentDetails
  
 @Post('/createStudentDetails')
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ summary: 'Create a new Student Details' })

 @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
 @ApiResponse({ status: HttpStatus.CREATED, description: 'Created Successfully' })
 @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
 @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Duplicate Entry' })
 @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
 @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error', })

 @ApiBody({
   description: 'Enter Student Details ',
   type: CreateStudentInput,
 })
 async createStudentDetails(
   @Body() createStudentDto: CreateStudentDto,
 ): Promise<CreateStudentResponse> {
   try {
     return await this.studentDetailsService.createStudentDetails(
      createStudentDto,
     );
   } catch (error) {
     this.loggerService
       .getLogger()
       .error(
         `StudentDetails Controller :: Create StudentDetails error: ${JSON.stringify(
           error,
         )}`,
       );
     const errStatus: number = error.status;
     let response: CreateStudentResponse;
     switch (errStatus) {
       case HttpStatus.NOT_FOUND: {
         response = {
           status: HttpStatus.NOT_FOUND,
           error: 'Not Found',
         };
         break;
       }
       case HttpStatus.BAD_REQUEST: {
         response = {
           status: HttpStatus.BAD_REQUEST,
           error: 'Bad Request',
         };
         break;
       }
       case HttpStatus.CONFLICT: {
         response = {
           status: HttpStatus.CONFLICT,
           error: 'Duplicate Entry',
         };
         break;
       }
       default: {
         response = {
           status: HttpStatus.INTERNAL_SERVER_ERROR,
           error: JSON.stringify(error),
         };
         break;
       }
     }
     return response;
   }
 }

  /**
   * @function getStudentDetails 
   * @description get Student Details using regNo:
   */
   @Get('/getStudentDetails/:regNo')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({
     summary: 'Get the details of a Student using regNo',
   })
   @ApiResponse({
     status: HttpStatus.OK,
     description: 'Successfull',
   })
   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
   @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
   @ApiResponse({
     status: HttpStatus.INTERNAL_SERVER_ERROR,
     description: 'Internal Server Error',
   })
   async getStudentDetails(
     @Param('regNo') regNo: string,
   ): Promise<StudentResponse> {
     try {
       return await this.studentDetailsService.getStudentDetailsByregNo(
        regNo,
       );
     } catch (error) {
       //console.log(error);
       this.loggerService
         .getLogger()
         .error(
           `Student Details Controller :: Create Student Details error: ${JSON.stringify(
             error,
           )}`,
         );
       const errStatus: number = error.status;
       let response: StudentResponse;
       switch (errStatus) {
         case HttpStatus.NOT_FOUND: {
           response = {
             status: HttpStatus.NOT_FOUND,
             error: 'Not Found',
           };
           break;
         }
         case HttpStatus.BAD_REQUEST: {
           response = {
             status: HttpStatus.BAD_REQUEST,
             error: 'Bad Request',
           };
           break;
         }
         default: {
           response = {
             status: HttpStatus.INTERNAL_SERVER_ERROR,
             error: JSON.stringify(error),
           };
           break;
         }
       }
       return response;
     }
   }


  /**
   * @function getStudentDetailsBYName
   * @description get Student Details using By studentName
   */
  @Get('/getStudentDetailsBYName/:studentName')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get the details of a Student using studentName  ',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfull',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  async getStudentDetailsBYName(
    @Param('studentName') studentName: string,
  ): Promise<StudentResponse> {
    try {
      return await this.studentDetailsService.getStudentDetailsBYName(studentName);
    } catch (error) {
      console.log(error);
      this.loggerService
        .getLogger()
        .error(
          `Student Details Controller :: Create Student Details error: ${JSON.stringify(
            error,
          )}`,
        );
      const errStatus: number = error.status;
      let response: StudentResponse;
      switch (errStatus) {
        case HttpStatus.NOT_FOUND: {
          response = {
            status: HttpStatus.NOT_FOUND,
            error: 'Not Found',
          };
          break;
        }
        case HttpStatus.BAD_REQUEST: {
          response = {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
          };
          break;
        }
        default: {
          response = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: JSON.stringify(error),
          };
          break;
        }
      }
      return response;
    }
  }



  /**
   * @function updateStudentDetails
   * @description Update Student Details
   */
  @Put('/updateStudentDetails')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Student Details' })

  @ApiResponse({status: HttpStatus.OK,description: 'Ok'})
  @ApiResponse({ status: HttpStatus.CREATED,description: 'Updated Successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Duplicate Entry' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' })

  @ApiBody({
    description: 'Enter Student Details',
    type: CreateStudentInput,
  })
  async updateStudentDetails(
    @Body() createStudentDto: CreateStudentDto
  ): Promise<CreateStudentResponse> {
    try {
      return await this.studentDetailsService.updateStudentDetails(
        createStudentDto
      );
    } catch (error) {
      console.log(error)
      this.loggerService
        .getLogger()
        .error(
          `StudentDetails Controller :: Update StudentDetails error: ${JSON.stringify(
            error,
          )}`,
        );
      const errStatus: number = error.status;
      let response: CreateStudentResponse;
      switch (errStatus) {
        case HttpStatus.NOT_FOUND: {
          response = {
            status: HttpStatus.NOT_FOUND,
            error: 'Not Found',
          };
          break;
        }
        case HttpStatus.BAD_REQUEST: {
          response = {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
          };
          break;
        }
        case HttpStatus.CONFLICT: {
          response = {
            status: HttpStatus.CONFLICT,
            error: 'Duplicate Entry',
          };
          break;
        }
        default: {
          response = {
            status: HttpStatus.OK,
            error: JSON.stringify(error),
          };
          break;
        }
      }
      return response;
    }
  }








    
}
