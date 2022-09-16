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

export const MoreModalAtom = atom<QuestionID>({
  key: "MoreModalAtom",
  default: "" as QuestionID,
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
