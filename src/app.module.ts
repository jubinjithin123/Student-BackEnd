import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'; //1.Import mongoose module
import { StudentDetailsModule } from './modules/student-details/student-details.module';
import { ArticleDetailsModule } from './modules/articles/articles.module';
import { ValidatorService } from './services';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/student-app',
    {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}),
    
    StudentDetailsModule,
    ArticleDetailsModule,
    
    AuthModule,
 
  ], // 2. Connect the database
  controllers: [AppController,],
  providers: [AppService,ValidatorService],
})
export class AppModule {}
