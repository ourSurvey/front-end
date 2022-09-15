import { QuestionListID, SectionID, QuestionID, QuestionItemID } from "types/survey";

export const getDateSixDigitsFormatToday = (): number => {
  const date = new Date();
  const year = String(date.getFullYear()).substring(2);
  let monthSet;
  const month = date.getMonth() + 1;
  if (month < 10) {
    monthSet = `0${month}`;
  }

  const day = date.getDate();

  return Number(`${year}${monthSet}${day}`);
};

export const numberSet = (num: number) => {
  let ASCCode = 65; //아스키코드 대문자 A;
  if (num > 999) ASCCode++;
  if (ASCCode > 90) return;

  return `${String.fromCharCode(ASCCode)}${("000" + num).slice(-3)}`;
};

export const PartIDFormat = (idx: number): SectionID => {
  return `SCTN${getDateSixDigitsFormatToday()}${numberSet(idx)}`;
};
export const QuestionIDFormat = (idx: number): QuestionID => {
  return `QSTN${getDateSixDigitsFormatToday()}${numberSet(idx)}`;
};
export const QuestionListIDFormat = (idx: number): QuestionListID => {
  return `QTSCTN${getDateSixDigitsFormatToday()}${numberSet(idx)}`;
};

export const QuestionItemIDFormat = (idx: number): QuestionItemID => {
  return `QSTI${getDateSixDigitsFormatToday()}${numberSet(idx)}`;
};