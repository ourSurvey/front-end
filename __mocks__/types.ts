interface Temp {
  endDate: string;
  id: string;
  subject: string;
  replyCount: number;
  startDate: string;
  status: number;
  tempFl: number;
}
export interface IMockTemp {
  data: {
    tempCount: number;
    finCount: number;
    ingCount: number;
    replyCount: number;
    willCount: number;
    list: Temp[];
  };
}
