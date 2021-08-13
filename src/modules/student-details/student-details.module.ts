import { Module } from '@nestjs/common';
import { StudentDetailsController } from './student-details.controller';
import { StudentDetailsService } from './student-details.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService, UtilityService } from '../../services';
import { Student, StudentSchema } from './model';
//import { Connection } from '../../config';
import { StudentDetailsRepository  } from './student-details.repository';
import { StudentDetailsClient } from './student-details.client';



@Module({
  imports: [
    MongooseModule.forFeature([{name: Student.name,schema:StudentSchema}])
 
  ],
  
  controllers: [StudentDetailsController],
  providers: [
    StudentDetailsService,
    LoggerService,
    StudentDetailsRepository,
    StudentDetailsClient,
    UtilityService,
  ],
})


export class StudentDetailsModule {}
