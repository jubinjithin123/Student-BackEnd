import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ArticlesClient } from './articles.client';
import { Article, ArticleDocument } from './model';
import {
    CreateArticleDto,
    CreateArticleResponse,
    ArticlesResponse,
    ArticleResponse
  } from './dto';

import { UtilityService } from '../../services/utility.service';


@Injectable()
export class ArticlesRepository {
    constructor(
        private readonly articlesClient: ArticlesClient,
        private readonly utilityService: UtilityService,
      ) {}


 // @function createArticle
 async createArticle(
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    try {
      return await this.articlesClient.createArticle(
        createArticleDto,
      );
    } catch (error: any) {
      if (String(error).includes('E11000')) {
        throw new HttpException('Duplicate Entry', HttpStatus.CONFLICT);
      }
    }
  }

 /**
   * @function getArticleDetails
   * @description get all Article Details
  */
    async getArticleDetails(): Promise<Article[]> {
      return await this.articlesClient.getArticleDetails();
    }


  /**
   * @function getArticleDetailsForUpdt
   * @description get Article Details for Updation
  */
  async getArticleDetailsForUpdt(title: string): Promise<Article> {        
    const article: Article = await this.articlesClient.getArticleDetailsForUpdt(
      title,
    );
   // console.log(article);
    if (this.utilityService.isObjectEmpty(article)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return article;
  }



   /**
   * @function getArticleByTitle
   * @description get Article Details By Using Title
  */
   async getArticleByTitle(title: string): Promise<Article> {
    const article: Article = await this.articlesClient.getArticleByTitle(
      title,
    );
    if (this.utilityService.isObjectEmpty(article)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return article;
  }



  /**
   * @function updateArticleDetails
   * @description Update Article Details
  */
   async updateArticleDetails(modifiedArticleDto: Article): Promise<Article> {
    const article: Article = await this.articlesClient.updateArticleDetails(
      modifiedArticleDto,
    );
    if (this.utilityService.isObjectEmpty(article)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return article;
  }







}