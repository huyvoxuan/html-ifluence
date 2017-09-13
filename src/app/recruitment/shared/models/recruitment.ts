export interface IRecruitment {
  RecruitmentId: number;
  Name: string;
  JobDescription: string;
  JobRequirement: string;
  Benefits: string;
  Quantity: number;
  ExpiredDate: Date;
}
export class Recruitment implements IRecruitment{
  RecruitmentId: number;
  Name: string;
  JobDescription: string;
  JobRequirement: string;
  Benefits: string;
  Quantity: number;
  ExpiredDate: Date;
}
