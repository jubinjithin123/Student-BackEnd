import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './model';
import {
    CreateArticleDto,
    CreateArticleResponse,
    ArticlesResponse,
    ArticleResponse
  } from './dto';

@Injectable()
export class ArticlesClient {
    constructor(
        @InjectModel(Article.name)
          private ArticleDocumentModel: Model<ArticleDocument>,
        ) {}


   // @function createArticle
   async createArticle(
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    const createdArticleDto = new this.ArticleDocumentModel(createArticleDto);
    return createdArticleDto.save();
  }

 /**
   * @function getArticleDetails
   * @description get all Article Details
  */
   async getArticleDetails(): Promise<Article[]> {
    return await this.ArticleDocumentModel.find().limit(50).exec();
  }


  /**
   * @function getArticleDetailsForUpdt
   * @description get Article Details for Updation
  */
   async getArticleDetailsForUpdt(title: string): Promise<Article> {
    return await this.ArticleDocumentModel.findOne({ title: title }).exec();
  }


  
  /**
   * @function getArticleByTitle
   * @description get Article Details By Using Title
  */
   async getArticleByTitle(title: string): Promise<any> {
    let stringArray = [];
    stringArray = title.split(' ');
    return await this.ArticleDocumentModel
      .find({
        title: new RegExp(stringArray[0], 'i'),
      })
      .limit(50)
      .exec();
  }


  /**
   * @function updateArticleDetails
   * @description Update Article Details
  */
    async updateArticleDetails(modifiedArticleDto): Promise<Article> {     
      modifiedArticleDto.save();
      return modifiedArticleDto;
    }






}