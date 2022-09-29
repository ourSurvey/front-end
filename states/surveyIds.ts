//서베이의 리스트들의 ID만을 관리하는 파일
import { atom, atomFamily } from 'recoil';
import { SectionID, QuestionItemListID, QuestionListID } from 'types/survey';
import { getDateSixDigitsFormatToday, numberSet } from 'utills/getDateSixth';

export const sectionIdListAtom = atom<SectionID[]>({
  key: 'sectionIdListAtom',
  default: [`SCTN${getDateSixDigitsFormatToday()}A001`],
});

//질문의 ID만 관리하는 atom
export const qusetionIdListAtom = atomFamily<QuestionListID[], QuestionListID>({
  key: 'qusetionIdListAtom',
  default: (id) => [id],
});

//질문지의 Item ID만 관리하는 atom
export const qusetionItemIdListAtom = atomFamily<QuestionItemListID[], QuestionItemListID>({
  key: 'qusetionItemIdListAtom',
  default: (id) => [`${id}1` as QuestionItemListID],
});

//질문이 한개일 시 같이 삭제할 파트의 ID 정보
export const targetPartIdAtom = atom<SectionID>({
  key: 'targetPartIdAtom',
  default: '' as SectionID,
});

//지울 question의 ID값을 저장할 atom
export const targetQuestionIDAtom = atom<QuestionListID>({
  key: 'targetQuestionIDAtom',
  default: '' as QuestionListID,
});

//지울 question의 ID들이 저장되어 있는 배열의 id 값을 저장할 atom
export const targetQuestionListIDAtom = atom<QuestionListID>({
  key: 'targetQuestionListIDAtom',
  default: '' as QuestionListID,
});
