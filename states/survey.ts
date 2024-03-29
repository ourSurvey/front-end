import { atom, atomFamily, DefaultValue, selector, selectorFamily } from 'recoil';
import {
  sectionIdListAtom,
  qusetionIdListAtom,
  qusetionItemIdListAtom,
  targetQuestionListIDAtom,
} from 'states/surveyIds';
import { tagState } from 'states/tag';
import {
  type IQuestionItem,
  type IQuestion,
  type ISurveyData,
  type ISection,
  type QuestionItemID,
  type QuestionID,
  type SectionID,
  type QuestionItemListID,
  type QuestionListID,
} from 'types/survey';
import { isHaveBlankColumn } from 'utills/blankColumnCheck';
import {
  QuestionIDFormat,
  PartIDFormat,
  QuestionListIDFormat,
  QuestionItemIDFormat,
  QuestionItemListUniqueNumber,
  getDateSixDigitsFormatToday,
  numberSet,
} from 'utills/getDateSixth';
interface ITarget {
  part: number;
  question: number;
}

const GENDER_ITEM_DATA = [
  {
    content: '남성',
    oder: 1,
  },
  {
    content: '여성',
    oder: 2,
  },
  {
    content: '응답하지 않음',
    oder: 3,
  },
  {
    content: '기타',
    oder: 4,
  },
];

export const surveyState = atom<ISurveyData>({
  key: 'surveyState',
  default: {
    id: 0,
    subject: '',
    content: '',
    startDate: new Date(),
    endDate: new Date(),
    minute: 0,
    openFl: 1,
    tempFl: 1,
    closingComment: '',
    hashtag: [],
    sections: [],
  },
});

export const disableNextButtonState = selector({
  key: 'disableNextButtonState',
  get: ({ get }) => {
    const state = get(surveySelector);

    return isHaveBlankColumn(state);
  },
});

export const qusetionItemListAtomFamily = atomFamily<IQuestionItem, QuestionItemID>({
  key: 'qusetionItemListAtomFamily',
  default: (id) => {
    return {
      id,
      content: '',
      oder: 0,
      nextSection: -2,
    };
  },
});

export const qusetionListAtomFamily = atomFamily<IQuestion, QuestionID>({
  key: 'qusetionListAtomFamily',
  default: (id) => {
    return {
      id,
      ask: '',
      descrip: '',
      multiFl: 1,
      essFl: 1,
      randomShowFl: 0,
      dupFl: 0,
      oder: 0,
      nextFl: 0, // 다음 파트로 진행하기 버튼 토글
      questionItems: [],
    };
  },
});

export const sectionListAtomFamily = atomFamily<ISection, SectionID>({
  key: 'sectionListAtomFamily',
  default: (id) => {
    return {
      id,
      title: '',
      content: '',
      nextSection: -2,
      questions: [],
    };
  },
});

export const sectionTitleSelectorFamily = selectorFamily<string, SectionID>({
  key: 'sectionTitleSelectorFamily',
  get:
    (id) =>
    ({ get }) => {
      return get(sectionListAtomFamily(id)).title;
    },
});

export const targetAtom = atom<ITarget>({
  key: 'targetAtom',
  default: { part: 0, question: 0 },
});

export const templateAtom = atom<'email' | '' | 'gender' | 'birth' | 'phone'>({
  key: 'templateAtom',
  default: '',
});

// 템플릿 생성해주는 selector
export const templateSelector = selector({
  key: 'templateSelector',
  get: ({ get }) => {
    return get(templateAtom);
  },
  set: ({ get, set, reset }, newValue) => {
    const targetQuestionListID = get(targetQuestionListIDAtom);
    const qusetionIdList = get(qusetionIdListAtom(targetQuestionListID));
    const newQuestionIdx = qusetionIdList.length + 1;
    const questionListlastNumber = qusetionIdList[qusetionIdList.length - 1].slice(-1);

    set(qusetionIdListAtom(targetQuestionListID), [
      ...qusetionIdList,
      QuestionListIDFormat(Number(questionListlastNumber) + 1),
    ]); // 새로운 question을 만듬
    const partIdx = get(targetAtom).part;
    const question = get(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)));
    switch (newValue) {
      case 'birth': {
        set(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)), {
          ...question,
          ask: '출생 년도를 알려주세요.',
          multiFl: 0,
        } as IQuestion);
        break;
      }
      case 'phone': {
        set(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)), {
          ...question,
          ask: '연락이 가능한 휴대폰 번호를 알려주세요',
          multiFl: 0,
        } as IQuestion);
        break;
      }
      case 'gender': {
        set(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)), {
          ...question,
          ask: '성별을 알려주세요.',
          multiFl: 1,
        } as IQuestion);
        const PartFormat = `SCTN${getDateSixDigitsFormatToday()}${numberSet(partIdx)}`;
        const QuestionFormat = `QSTN${getDateSixDigitsFormatToday()}${numberSet(newQuestionIdx)}`;
        const QuestionItemListIdSyscodeFormat = `${PartFormat}${QuestionFormat}` as QuestionItemListID;
        const SyscodeFormat: QuestionListID = QuestionListIDFormat(partIdx);
        const questionItemIds = get(qusetionItemIdListAtom(QuestionItemListIdSyscodeFormat));
        const questionIdList = get(qusetionIdListAtom(SyscodeFormat));
        const newQuestionItemIdx = questionIdList.length + 1;
        const lastNumber = Number(questionItemIds[questionItemIds.length - 1].slice(-1));
        set(
          qusetionItemIdListAtom(QuestionItemListIdSyscodeFormat),
          (prevState) =>
            [
              ...prevState,
              `${QuestionItemListIdSyscodeFormat}${lastNumber + 1}`,
              `${QuestionItemListIdSyscodeFormat}${lastNumber + 2}`,
              `${QuestionItemListIdSyscodeFormat}${lastNumber + 3}`,
            ] as QuestionItemListID[]
        ); // questionItem ID 리스트 새로 생성
        GENDER_ITEM_DATA.forEach((item) => {
          const data = get(qusetionItemListAtomFamily(QuestionItemIDFormat(partIdx, newQuestionItemIdx, item.oder)));
          set(qusetionItemListAtomFamily(QuestionItemIDFormat(partIdx, newQuestionItemIdx, item.oder)), {
            ...data,
            content: item.content,
          } as IQuestionItem);
        });

        break;
      }
      case 'email': {
        set(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)), {
          ...question,
          ask: '연락이 가능한 이메일을 알려주세요.',
          multiFl: 0,
        } as IQuestion);
        break;
      }
      default:
        reset(templateAtom);
    }
  },
});

export const surveySelector = selector({
  key: 'surveySelector',
  get: ({ get }) => {
    const sectionList = get(sectionIdListAtom);
    const surveyData = get(surveyState);

    // 파트의 ID리스트
    const sections = sectionList.map((_, sectionIdx) => {
      const qusetionList = get(qusetionIdListAtom(QuestionListIDFormat(sectionIdx + 1)));
      // 질문의 ID리스트
      const questionLit = qusetionList.map((_, questionIdx) => {
        const PartFormat = `SCTN${getDateSixDigitsFormatToday()}${numberSet(sectionIdx + 1)}`;
        const QuestionFormat = `QSTN${getDateSixDigitsFormatToday()}${numberSet(questionIdx + 1)}`;
        const SyscodeFormat = `${PartFormat}${QuestionFormat}` as QuestionItemListID;

        // item의idList
        const questionItemIdList = get(qusetionItemIdListAtom(SyscodeFormat));
        const questionItem = questionItemIdList.map((questionItemIdx) => {
          // item 아톰 패밀리를 가져와서 리턴
          return get(
            qusetionItemListAtomFamily(
              QuestionItemIDFormat(sectionIdx + 1, questionIdx + 1, QuestionItemListUniqueNumber(questionItemIdx))
            )
          );
        });
        // question을 가져와서 questionItem을 담아서 리턴
        const question = get(qusetionListAtomFamily(QuestionIDFormat(questionIdx + 1, sectionIdx + 1)));
        const questionItemsLength = questionItem.length;
        const nextSectionSetting = questionItem.map((item, idx) => {
          // 마지막 인덱스라면
          if (idx + 1 === questionItemsLength) {
            return { ...item, nextSection: -1 };
          }
          if (item.nextSection === -2) {
            return { ...item, nextSection: 0 };
          }
          return item;
        });

        return { ...question, questionItems: nextSectionSetting };
      });

      const part = get(sectionListAtomFamily(PartIDFormat(sectionIdx + 1)));
      // part를 가져와서 question을 담아서 리턴
      return { ...part, questions: questionLit };
    });

    const tagList = get(tagState);
    const arrLength = sections.length;
    // 다음 섹션 세팅
    const nextSectionPropertySet = sections.map((item, idx) => {
      // 마지막 인덱스라면
      if (idx + 1 === arrLength) {
        return { ...item, nextSection: -1 };
      }
      return { ...item, nextSection: idx };
    });

    return { ...surveyData, sections: nextSectionPropertySet, hashtag: [...tagList] } as ISurveyData;
  },
});

interface IContentProps {
  partNum: number;
  questionNumber: number;
  SyscodeFormat: QuestionItemListID;
}

export const etcUpdateSelector = selectorFamily<
  IQuestionItem,
  {
    partNum: number;
    questionNumber: number;
    SyscodeFormat: QuestionItemListID;
  }
>({
  key: 'etcUpdateSelector',
  get:
    ({ partNum, questionNumber, SyscodeFormat }: IContentProps) =>
    ({ get }) => {
      return get(
        qusetionItemListAtomFamily(
          QuestionItemIDFormat(partNum, questionNumber, QuestionItemListUniqueNumber(SyscodeFormat))
        )
      );
    },
  set:
    ({ partNum, questionNumber, SyscodeFormat }: IContentProps) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(
          qusetionItemListAtomFamily(
            QuestionItemIDFormat(partNum, questionNumber, QuestionItemListUniqueNumber(SyscodeFormat))
          )
        );

        return;
      }

      set(
        qusetionItemIdListAtom(SyscodeFormat),
        (prevState) => [...prevState, `${SyscodeFormat}${Number(prevState.length) + 1}`] as QuestionItemListID[]
      );
      const questionItemListIds = get(qusetionItemIdListAtom(SyscodeFormat));
      set(
        qusetionItemListAtomFamily(
          QuestionItemIDFormat(
            partNum,
            questionNumber,
            QuestionItemListUniqueNumber(questionItemListIds[questionItemListIds.length - 1])
          )
        ),
        (prevState) => ({ ...prevState, content: newVal.content })
      );
    },
});
