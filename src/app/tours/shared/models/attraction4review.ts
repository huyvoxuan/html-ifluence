import { Geog } from '../../../shared/models/geog';
export interface IAttraction4Review {
  AttractionId: number;
  AttractionTypeId: number;
  ParentId: number;
  ParentTypeId: number;
  AttractionTypeName: string;
  Name: string;
  Address: string;
  CreateByName: string;
  PhotoUrl: string;
  ViewCount: number;
  CommentCount: number;
  StatusName: string;
  RatingCount: number;
  Geog: Geog;
  StatusId: number;
  StateCode: string;
  CountryCode: string;
  StateName: string;
  CountryName: string;
  Description: string;
  CountryId: number;
  CreatedAt: Date;
  ListPhotoInfos: {}[];

}
export class Attraction4Review implements IAttraction4Review {
  AttractionId: number;
  AttractionTypeId: number;
  ParentId: number;
  ParentTypeId: number;
  AttractionTypeName: string;
  Name: string;
  Address: string;
  CreateByName: string;
  PhotoUrl: string;
  ViewCount: number;
  CommentCount: number;
  StatusName: string;
  RatingCount: number;
  Geog: Geog;
  StatusId: number;
  StateCode: string;
  CountryCode: string;
  StateName: string;
  CountryName: string;
  Description: string;
  CountryId: number;
  CreatedAt: Date;
  ListPhotoInfos: {}[];
}
