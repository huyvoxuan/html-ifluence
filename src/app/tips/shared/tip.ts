export interface ITip {
  Description: string;
  PhotoUrls: string[];
  IsLiked: boolean;
  RatingCount: number;
  // ListPhotoInfos
  Address: string;
  TipId: number;
  TipTypeId: number;
  Name: string;
  LikeCount: number;
  CommentCount: number;
  TipTypeName: string;
  CreateByName: string;
  StatusId: number;
  StatusName: string;
  StateName: string;
  StateCode: string;
  CountryName: string;
  CountryCode: string;
  CreatedAt: Date;
  PhotoUrl: string;
}
export class Tip implements ITip {
  Description: string;
  PhotoUrls: string[];
  IsLiked: boolean;
  RatingCount: number;
  // ListPhotoInfos
  Address: string;
  TipId: number;
  TipTypeId: number;
  Name: string;
  LikeCount: number;
  CommentCount: number;
  TipTypeName: string;
  CreateByName: string;
  StatusId: number;
  StatusName: string;
  StateName: string;
  StateCode: string;
  CountryName: string;
  CountryCode: string;
  CreatedAt: Date;
  PhotoUrl: string;
}

/**
 * Tip type
**/
export interface ITipType {
  TipTypeId: number;
  Name: string;
}
export class TipType implements ITipType {
  TipTypeId: number;
  Name: string;
}
