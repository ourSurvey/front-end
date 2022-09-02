import { atom, selector } from "recoil";
import { IQuestion, ISection, ISurveyData } from "types/survey";

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
    sections: [
      {
        title: "", //섹션제목,
        content: "", //설명,
        nextSection: -1, //*다음섹션(Integer|-1이면 이 섹션이 마지막 섹션, 사실 그냥 index값임 프론트에서도 설문 만들 때 정렬해서 보여줘야하니깐 index값 그대로 넣기),
        questions: [
          {
            ask: "",
            explain: "",
            multiFl: 1,
            essFl: 0,
            dupFl: 0,
            oder: 0,
            questionItems: [{ content: "", oder: 0, nextSection: 0 }],
          },
        ],
      },
    ],
  },
});

export const partCountState = selector({
  key: "partCount",
  get: ({ get }) => {
    const survey = get(surveyState);
    return survey.sections.length;
  },
});
