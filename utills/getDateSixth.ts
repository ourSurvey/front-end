import {
  type QuestionListID,
  type SectionID,
  type QuestionID,
  type QuestionItemID,
  type QuestionItemListID,
} from 'types/survey';

export const getDateSixDigitsFormatToday = (): number => {
  const date = new Date();
  const year = String(date.getFullYear()).substring(2);
  let monthSet: string;

  const month = date.getMonth() + 1;
  if (month < 10) {
    monthSet = `0${month}`;
  } else {
    monthSet = String(month);
  }
  let daySet: string;
  const day = date.getDate();
  if (day < 10) {
    daySet = `0${day}`;
  } else {
    daySet = String(day);
  }

  return Number(`${year}${monthSet}${daySet}`);
};

export const numberSet = (num: number) => {
  let ASCCode = 65; // 아스키코드 대문자 A;
  if (num > 999) ASCCode++;
  if (ASCCode > 90) return '';

  return `${String.fromCharCode(ASCCode)}${`000${num}`.slice(-3)}`;
};

export const PartIDFormat = (idx: number): SectionID => {
  return `SCTN${getDateSixDigitsFormatToday()}${numberSet(idx)}`;
};
export const QuestionIDFormat = (idx: number, partId: number): QuestionID => {
  return `QSTN${partId}${getDateSixDigitsFormatToday()}${numberSet(idx)}`;
};
export const QuestionListIDFormat = (idx: number): QuestionListID => {
  return `QTSCTN${getDateSixDigitsFormatToday()}${numberSet(idx)}`;
};

export const QuestionItemIDFormat = (partId: number, questionId: number, idx: number): QuestionItemID => {
  return `QSTI${partId}${questionId}${idx}${getDateSixDigitsFormatToday()}${numberSet(idx)}`;
};

export const QuestionItemListIDFormat = (partIndex: number, questionIdx: number) =>
  `${PartIDFormat(partIndex)}${QuestionIDFormat(questionIdx, partIndex)}`;

export const getDateFormat = (date: Date): string => {
  const year = String(date.getFullYear());
  let monthSet: string;

  const month = date.getMonth() + 1;
  if (month < 10) {
    monthSet = `0${month}`;
  } else {
    monthSet = String(month);
  }
  let daySet: string;
  const day = date.getDate();
  if (day < 10) {
    daySet = `0${day}`;
  } else {
    daySet = String(day);
  }

  return `${year}.${monthSet}.${daySet}`;
};
export const QuestionItemListUniqueNumber = (qustionItemListId: QuestionItemListID) => {
  const splittedQuestionItemListId = qustionItemListId.split('A');
  const uniqueNumber = splittedQuestionItemListId[splittedQuestionItemListId.length - 1].slice(3);
  return Number(uniqueNumber);
};
