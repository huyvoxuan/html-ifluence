export interface INews {
  CommentCount: number;
  CreatedAt: Date;
  Description: string;
  IsLiked: boolean;
  NewsId: number;
  NewsTypeId: number;
  PhotoInfos: string[];
  RatingCount: number;
  StatusId: number;
  Titile: string;
  ViewCount: number;
}
export class News implements INews {
  CommentCount: number;
  CreatedAt: Date;
  Description: string;
  IsLiked: boolean;
  NewsId: number;
  NewsTypeId: number;
  PhotoInfos: string[];
  RatingCount: number;
  StatusId: number;
  Titile: string;
  ViewCount: number;
}
