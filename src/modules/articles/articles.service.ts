import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UtilityService } from '../../services';
import { ArticlesRepository} from './articles.repository';
import { Article, ArticleDocument } from './model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    CreateArticleDto,
    CreateArticleResponse,
    ArticlesResponse,
    ArticleResponse
  } from './dto';

@Injectable()
export class ArticlesService {
    constructor(
        private readonly articlesRepository: ArticlesRepository,
        private readonly utilitySerive: UtilityService,
        @InjectModel(Article.name)
        private ArticleDocumentModel: Model<ArticleDocument>,
      ) {}

      
  // @function createArticle   

  async createArticle(
    createArticleDto: CreateArticleDto,
  ): Promise<CreateArticleResponse> {
    if (
      typeof createArticleDto === 'undefined' ||
      this.utilitySerive.isObjectEmpty(createArticleDto)
    ) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } else {
     // createAccountheadDto.status = 1;
     // createAccountheadDto.createdOn = new Date();
      const article: Article= await this.articlesRepository.createArticle(
        createArticleDto,
      );
      return {
        status: HttpStatus.CREATED,
        result: {
          title: article.title,
        },
        message: 'Article Details created successfully',
      };
    }
  }


 /**
   * @function getArticleDetails
   * @description get all Article Details
  */
    async getArticleDetails(): Promise<ArticlesResponse> {
      const article: Article[] = await this.articlesRepository.getArticleDetails();
      return {
        status: HttpStatus.OK,
        result: article,
        message: 'All Article Details fetched successfully',
      };
    }



  /**
   * @function getArticleByTitle
   * @description get Article Details By Using Title
  */
    async getArticleByTitle(
      title: string,
    ): Promise<ArticleResponse> {
      if (String(title).length < 3 || typeof title === 'undefined') {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      const article: Article = await this.articlesRepository.getArticleByTitle(
        title,
      );
      return {
        status: HttpStatus.OK,
        result: article,
        message: 'Article Details fetched successfully',
      };
    }


 
  /**
   * @function updateArticleDetails
   * @description Update Article Details
  */

        async updateArticleDetails(
          modifyArticleDto: CreateArticleDto
        ): Promise<CreateArticleResponse> {
          const article: Article = await this.articlesRepository.getArticleDetailsForUpdt(
            modifyArticleDto.title,
          );
         
          // assign the user input to article object         
          let updated = Object.assign(article, modifyArticleDto);
     
        //  customer.createdBy = customer.createdBy;
        //  customer.modifiedOn = new Date();
          const articleModify: Article = await this.articlesRepository.updateArticleDetails(
            updated);
                  
          return {
            status: HttpStatus.CREATED,
            result: articleModify,
            message: 'Article Details Successfully Updated !!!!!',
          };
        }





    

}