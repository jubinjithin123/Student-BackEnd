import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService, UtilityService } from '../../services';
import { Article, ArticleSchema } from './model';
//import { Connection } from '../../config';
import { ArticlesRepository  } from './articles.repository';
import { ArticlesClient } from './articles.client';



@Module({
  imports: [
    MongooseModule.forFeature([{name: Article.name,schema:ArticleSchema}])
 
  ],
  
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    LoggerService,
    ArticlesRepository,
    ArticlesClient,
    UtilityService,
  ],
})


export class ArticleDetailsModule {}
