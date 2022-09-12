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

export interface IContent {
  subject: string;
  content: string;
  id: number;
  openFl: 1 | 0;
  minute: number;
  startDate: Date;
  endDate: Date;
  createdDt?: Date;
  hashtagList: null | [];
}

export interface ISurveyData {
  id: number; //임시저장한걸 실제저장하려고 할 때 보내주세요 default 0;
  subject: string; //제목,
  content: string; //서베이에 대한 설명,
  startDate: string; //시작일(년월일),
  endDate: string; //종료일(년월일),
  minute: number; //소요시간(Integer),
  openFl: 0 | 1; //공개여부(Integer|0:미공개,1:공개),
  tempFl: 0 | 1; //임시저장여부(Integer|0:임시, 1:임시X)
  closingComment: string; //마무리멘트,
  hashtag: string[]; //[해시태그 리스트,String 배열],
  sections: ISection[];
}
export type SurveyID = `SUVY${number}${string}`;
export type SectionID = `SCTN${number}${string}`;
export type QuestionID = `QSTN${number}${string}`;
export type QuestionItemID = `QSTI${number}${string}`;
export type QuestionItemListID = `SCTN${number}${string}QSTN${number}${string}`;
export type QuestionListID = `QTSCTN${number}${string}`;
export interface ISection {
  id: SectionID;
  title: string; //섹션제목,
  content: string; //설명,
  nextSection: number; //*다음섹션(Integer|-1이면 이 섹션이 마지막 섹션, 사실 그냥 index값임 프론트에서도 설문 만들 때 정렬해서 보여줘야하니깐 index값 그대로 넣기),
  questions: IQuestion[];
}

export interface IQuestion {
  id: QuestionID;
  ask: string; //*질문,
  descrip: string; //설명,
  multiFl: 0 | 1; //*(Integer|0:주관식,1:객관식),
  essFl: 0 | 1; //*필수질문여부(Integer|0:필수X,1:필수),
  randomShowFl: 0 | 1; //"*선택지 무작위 섞기 플래그(Integer|0:무작위섞기OFF, 1:무작위섞기ON - 주관식이면 무조건 0으로 주세요"
  dupFl: 0 | 1; //*질문이 객관식일 때 중복선택 가능여부(Integer|0:중복X,1:중복가능|주관식이면 무조건 0),
  oder: number; //*순서(Integer|사실 그냥 index값임 프론트에서도 설문 만들 때 정렬해서 보여줘야하니깐 index값 그대로 넣어주세요),
  questionItems: IQuestionItem[];
}

export interface IQuestionItem {
  id: QuestionItemID;
  content: string; //*선택지,
  oder: number; //*위 oder랑 동일함,
  nextSection: number; //다음섹션(답변을 기준으로 파트이동일 때 - Integer|-1이면 설문제출, 답변 기준 파트이동이 아니라면 0으로)
}
