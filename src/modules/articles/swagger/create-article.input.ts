
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleInput {
  
  @ApiProperty({
    example: 'Tech Article',
    description: 'Title of the Article',
  })
  title: string;


  @ApiProperty({
    example: 'Patrick Coombe',
    description: 'Author name',
  })
  author: string;

  @ApiProperty({
    example: 'The article that live in the Nestjs server',
    description: 'Description',
  })
  description: string;

  @ApiProperty({
    example: 'We love to do stuff to help people and stuff',
    description: 'Content',
  })
  content: string;



}
