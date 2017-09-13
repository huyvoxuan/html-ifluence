import { Status, State } from '../../../shared/models/index';
import { PhotoInfo } from './photoinfo';
export interface IEventOfTour {
  EventId: number;
  Name: string;
  Description: string;
  Address: string;
  Status: Status;
  State: State;
  PhotoInfos: PhotoInfo[];
  PhotoUrls: string[];
  CreatedBy: {};
  LikeCount: number;
  CommentCount: number;
  RatingCount: number;
  IsLiked: boolean;
  StateName: string;
  CountryName: string;
  StateCode: string;
  CountryCode: string;
  CreateByName: string;
  CreatedAt: Date;
  StatusName: string;
}
export class EventOfTour implements IEventOfTour {
  EventId: number;
  Name: string;
  Description: string;
  Address: string;
  Status: Status;
  State: State;
  PhotoInfos: PhotoInfo[];
  PhotoUrls: string[];
  CreatedBy: {};
  LikeCount: number;
  CommentCount: number;
  RatingCount: number;
  IsLiked: boolean;
  StateName: string;
  CountryName: string;
  StateCode: string;
  CountryCode: string;
  CreateByName: string;
  CreatedAt: Date;
  StatusName: string;
}
