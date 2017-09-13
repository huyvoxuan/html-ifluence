import { Status } from '../../models/status';
export interface IComment {
  CommentId: number;
  MemberId: number;
  ParentId: number;
  ParentTypeId: number;
  Rating: number;
  Message: string;
  StatusId: number;
  Status: Status;
  CreatedAt: Date;
}
// post a comment
export class Comment implements IComment {
  CommentId: number;
  MemberId: number;
  ParentId: number;
  ParentTypeId: number;
  Rating: number;
  Message: string;
  StatusId: number;
  Status: Status;
  CreatedAt: Date;
}

// get comment to view
export interface ICommentItem {
  ChildCommentCount: number;
  // Children:
  CommentId: number;
  CreatedAt: string;
  MemberId: number;
  MemberAvatar: string;
  MemberFirstName: string;
  MemberLastName: string;
  MemberName: string;
  Message: string;
  ParentId: number;
  Photo4Reviews: Object[];
  Rating: number;
  ParentTypeId: number;
  StatusId: number;
  Status: Status;
}
export class CommentItem implements ICommentItem{
  ChildCommentCount: number;
  // Children:
  CommentId: number;
  CreatedAt: string;
  MemberId: number;
  MemberAvatar: string;
  MemberFirstName: string;
  MemberLastName: string;
  MemberName: string;
  Message: string;
  ParentId: number;
  Photo4Reviews: Object[];
  Rating: number;
  ParentTypeId: number;
  StatusId: number;
  Status: Status;
}
/*

export interface IPhoto4Review {
  IsDefault: boolean;
  PhotoId: number;
  PhotoUrl: string;
  SortOrder: number;
  ThumbnailUrl: string;
}
export class Photo4Review implements IPhoto4Review {
  IsDefault: boolean;
  PhotoId: number;
  PhotoUrl: string;
  SortOrder: number;
  ThumbnailUrl: string;
}
*/
