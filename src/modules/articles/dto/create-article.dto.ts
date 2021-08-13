import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';

export class CreateArticleDto { 

  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly content: string;


}
