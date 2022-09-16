import { atom, atomFamily } from "recoil";
import {
  IQuestionItem,
  IQuestion,
  ISurveyData,
  ISection,
  QuestionItemID,
  QuestionID,
  SectionID,
  QuestionItemListID,
  QuestionListID,
} from "types/survey";
import { getDateSixDigitsFormatToday } from "utills/getDateSixth";

export const surveyState = atom<ISurveyData>({
  key: "surveyState",
  default: {
    id: 0,
    subject: "",
    content: "",
    startDate: "",
    endDate: "",
    minute: 0,
    openFl: 1,
    tempFl: 1,
    closingComment: "",
    hashtag: [],
    sections: [],
  },
});

//질문이 한개일 시 같이 삭제할 파트의 ID 정보
export const targetPartIdAtom = atom<SectionID>({
  key: "targetPartIdAtom",
  default: "" as SectionID,
});

export const MoreModalAtom = atom<QuestionID>({
  key: "MoreModalAtom",
  default: "" as QuestionID,
});

//지울 question의 ID값을 저장할 atom
export const targetQuestionIDAtom = atom<QuestionListID>({
  key: "targetQuestionIDAtom",
  default: "" as QuestionListID,
});

//지울 question의 ID들이 저장되어 있는 배열의 id 값을 저장할 atom
export const targetQuestionListIDAtom = atom<QuestionListID>({
  key: "targetQuestionListIDAtom",
  default: "" as QuestionListID,
});

export const qusetionItemListAtomFamily = atomFamily<IQuestionItem, QuestionItemID>({
  key: "qusetionItemListAtomFamily",
  default: (id) => {
    return {
      id,
      content: "",
      oder: 0,
      nextSection: 0,
    };
  },
});

//질문지의 Item ID만 관리하는 atom
export const qusetionItemIdListAtom = atomFamily<QuestionItemListID[], QuestionItemListID>({
  key: "qusetionItemIdListAtom",
  default: (id) => [`${id}1` as QuestionItemListID],
});

export const qusetionListAtomFamily = atomFamily<IQuestion, QuestionID>({
  key: "qusetionListAtomFamily",
  default: (id) => {
    return {
      id,
      ask: "",
      descrip: "",
      multiFl: 1,
      essFl: 1,
      randomShowFl: 0,
      dupFl: 0,
      oder: 0,
      hasNextPart: false, //다음 파트로 진행하기 버튼 토글
      questionItems: [],
    };
  },
});

//질문의 Item ID만 관리하는 atom
export const qusetionIdListAtom = atomFamily<QuestionListID[], QuestionListID>({
  key: "qusetionIdListAtom",
  default: (id) => [id],
});

export const sectionListAtomFamily = atomFamily<ISection, SectionID>({
  key: "sectionListAtomFamily",
  default: (id) => {
    return {
      id,
      title: "",
      content: "",
      nextSection: -1,
      questions: [],
    };
  },
});

export const sectionIdListAtom = atom<SectionID[]>({
  key: "sectionIdListAtom",
  default: [`SCTN${getDateSixDigitsFormatToday()}A001`],
});
