export interface ISurveyType {
  getSurveyToPage: ISurvey;
}
export interface ISurvey {
  code: number;
  message: string;
  data: ISurvetData;
}

interface ISurvetData {
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  content: IContent;
}

interface IContent {
  subject: string;
  content: string;
  openFl: number;
  minute: number;
  startDate: Date;
  endDate: Date;
  createdDt: Date;
  hashtagList: null | [];
}
