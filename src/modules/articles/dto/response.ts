import { Article } from '../model/article.schema';

export interface CreateArticleResponse {
  status: number;
  result?: any;
  message?: string;
  error?: string;
}

export interface ArticlesResponse {
  status: number;
  result?: Article[];
  message?: string;
  error?: string;
}

export interface ArticleResponse {
  status: number;
  result?: Article;
  message?: string;
  error?: string;
}
