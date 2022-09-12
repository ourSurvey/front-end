import { atom, atomFamily } from "recoil";
import { IQuestionItem, IQuestion, ISection, QuestionItemID, QuestionID, SectionID, QuestionItemListID, QuestionListID } from "types/survey";
import { getDateSixDigitsFormatToday } from "utills/getDateSixth";

interface QuectionAtomFamilytype {
  partId: number;
  qusetionid: number;
}

// export const surveyState = atom<ISurveyData>({
//   key: "surveyState",
//   default: {
//     id: 0,
//     subject: "",
//     content: "",
//     startDate: "",
//     endDate: "",
//     minute: 0,
//     openFl: 1,
//     tempFl: 1,
//     closingComment: "",
//     hashtag: [],
//     sections: [
//       {
//         title: "", //섹션제목,
//         content: "", //설명,
//         nextSection: -1, //*다음섹션(Integer|-1이면 이 섹션이 마지막 섹션, 사실 그냥 index값임 프론트에서도 설문 만들 때 정렬해서 보여줘야하니깐 index값 그대로 넣기),
//         questions: [
//           {
//             ask: "",
//             descrip: "",
//             multiFl: 1,
//             essFl: 0,
//             dupFl: 0,
//             oder: 0,
//             questionItems: [{ id: 0, content: "", oder: 0, nextSection: 0 }],
//           },
//         ],
//       },
//     ],
//   },
// });

// export const partCountState = selector({
//   key: "partCount",
//   get: ({ get }) => {
//     const survey = get(surveyState);
//     return survey.sections.length;
//   },
// });

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
  default: (id) => [id],
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
