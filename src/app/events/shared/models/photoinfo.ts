export interface IPhotoInfo {
  PhotoId: number;
  PhotoName: string;
  PhotoUrl: string;
  SortOrder: number;
  IsMainPhotp: boolean;
  IsAvatar: boolean;
  StatusId: number;
  IsDefault: boolean;
  IsFeatured: boolean;
}
export class PhotoInfo implements IPhotoInfo {
  PhotoId: number;
  PhotoName: string;
  PhotoUrl: string;
  SortOrder: number;
  IsMainPhotp: boolean;
  IsAvatar: boolean;
  StatusId: number;
  IsDefault: boolean;
  IsFeatured: boolean;
}
