export interface ILoginUser {
  UserName: string;
  Password: string;
}
export class LoginUser implements ILoginUser {
  UserName: string;
  Password: string;
}

export interface IUser {
  MemberId: number;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  Email: string;
  PhotoUrl: string;
  StatusId: number;
  DeviceTokenId: number;
  DeviceCode: string;
  MemberShipInfo: string;
}
export class User implements IUser {
  MemberId: number;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  Email: string;
  PhotoUrl: string;
  StatusId: number;
  DeviceTokenId: number;
  DeviceCode: string;
  MemberShipInfo: string;
}

export interface IFbUser {
  FbAccessToken: string;
  FbUserId: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  PhotoUrl: string;
  DeviceTokenId: string;
}

export class FbUser implements IFbUser {
  FbAccessToken: string;
  FbUserId: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  PhotoUrl: string;
  DeviceTokenId: string;
}
