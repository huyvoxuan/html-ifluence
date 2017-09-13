import { Geog } from '../../../shared/models/geog';
export interface IAttraction {
  AttractionId: number;
  AttractionTypeId: number;
  ParentId: number;
  ParentTypeId: number;
  Name: string;
  Address: string;
  PhotoUrls: string[];
  Description: string;
  ViewCount: number;
  CommentCount: number;
  RatingCount: number;
  IsLike: boolean;
  Geog: Geog;
  ListPhotoInfos: {}[];
  StatusId: number;
  StateCode: string;
  CountryCode: string;
}
export class Attraction implements IAttraction {
  AttractionId: number;
  AttractionTypeId: number;
  ParentId: number;
  ParentTypeId: number;
  Name: string;
  Address: string;
  PhotoUrls: string[];
  Description: string;
  ViewCount: number;
  CommentCount: number;
  RatingCount: number;
  IsLike: boolean;
  Geog: Geog;
  ListPhotoInfos: {}[];
  StatusId: number;
  StateCode: string;
  CountryCode: string;
}
