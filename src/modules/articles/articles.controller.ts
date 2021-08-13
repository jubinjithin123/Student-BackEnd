import {
    Controller,Post,Get,Put,Delete,Param,
    Body,NotFoundException,HttpStatus,HttpCode,
  } from '@nestjs/common';

  import {
    ApiBearerAuth,ApiOperation,ApiResponse,
    ApiTags,ApiBody,
  } from '@nestjs/swagger';

  import { ArticlesService } from './articles.service';
  import { LoggerService } from '../../services';
  import {
    CreateArticleDto,
    CreateArticleResponse,
    ArticlesResponse,
    ArticleResponse
  } from './dto';
  import { CreateArticleInput } from './swagger';

@ApiBearerAuth()
@ApiTags('Article ') 
@Controller('articles')


export class ArticlesController {

    constructor(
        private readonly articlesService: ArticlesService, 
        private readonly loggerService: LoggerService,    
        ) {}

 /**
   * @function getArticleDetails
   * @description get all Article Details
  */
  @Get('/getArticleDetails')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get the list of All Article Details' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfull', })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error', })

  async getArticleDetails(): Promise<ArticlesResponse> {
    try {
      return await this.articlesService.getArticleDetails();
    } catch (error) {
      this.loggerService
        .getLogger()
        .error(
          `Articles Details Controller :: Articles Details error: ${JSON.stringify(
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



  
// @function createArticle

 @Post('/addArticle')
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ summary: 'Create a new Article ' })

 @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
 @ApiResponse({ status: HttpStatus.CREATED, description: 'Created Successfully' })
 @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
 @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Duplicate Entry' })
 @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
 @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error', })

 @ApiBody({
   description: 'Enter Article Details ',
   type: CreateArticleInput,
 })
 async createArticle(
   @Body() createArticleDto: CreateArticleDto,
 ): Promise<CreateArticleResponse> {
   try {
     return await this.articlesService.createArticle(
      createArticleDto,
     );
   } catch (error) {
     this.loggerService
       .getLogger()
       .error(
         `Article Controller :: Create Article error: ${JSON.stringify(
           error,
         )}`,
       );
     const errStatus: number = error.status;
     let response: CreateArticleResponse;
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
   * @function getArticleByTitle
   * @description get Article Details By Using Title
  */
   @Get('/getArticle/:title')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({
     summary: 'Get the details of a Article using title  ',
   })
   @ApiResponse({ status: HttpStatus.OK, description: 'Successfull', })
   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
   @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
   @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error', })

   async getArticleByTitle(
     @Param('title') title: string,
   ): Promise<ArticleResponse> {
     try {
       return await this.articlesService.getArticleByTitle(title);
     } catch (error) {
       console.log(error);
       this.loggerService
         .getLogger()
         .error(
           `Article Details Controller :: Article Details error: ${JSON.stringify(
             error,
           )}`,
         );
       const errStatus: number = error.status;
       let response: ArticleResponse;
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
   * @function updateArticleDetails
   * @description Update Article Details
  */
  @Put('/updateArticle')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Article Details' })

  @ApiResponse({status: HttpStatus.OK,description: 'Ok'})
  @ApiResponse({ status: HttpStatus.CREATED,description: 'Updated Successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Duplicate Entry' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' })

  @ApiBody({
    description: 'Enter Article Details',
    type: CreateArticleInput,
  })
  async updateArticleDetails(
    @Body() createArticleDto: CreateArticleDto
  ): Promise<CreateArticleResponse> {
    try {
      return await this.articlesService.updateArticleDetails(
        createArticleDto
      );
    } catch (error) {
      console.log(error)
      this.loggerService
        .getLogger()
        .error(
          `Article Details Controller :: Update Article Details error: ${JSON.stringify(
            error,
          )}`,
        );
      const errStatus: number = error.status;
      let response: CreateArticleResponse;
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