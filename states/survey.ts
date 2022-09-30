import {
  sectionIdListAtom,
  qusetionIdListAtom,
  qusetionItemIdListAtom,
  targetQuestionListIDAtom,
} from 'states/surveyIds';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { QuestionIDFormat, PartIDFormat, QuestionListIDFormat, QuestionItemIDFormat } from 'utills/getDateSixth';
import {
  IQuestionItem,
  IQuestion,
  ISurveyData,
  ISection,
  QuestionItemID,
  QuestionID,
  SectionID,
  QuestionItemListID,
} from 'types/survey';
import { getDateSixDigitsFormatToday, numberSet } from 'utills/getDateSixth';
import { tagState } from 'states/tag';
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
    startDate: '2022-09-01',
    endDate: '2022-09-30',
    minute: 0,
    openFl: 1,
    tempFl: 1,
    closingComment: '',
    hashtag: [],
    sections: [],
  },
});

export const qusetionItemListAtomFamily = atomFamily<IQuestionItem, QuestionItemID>({
  key: 'qusetionItemListAtomFamily',
  default: (id) => {
    return {
      id,
      content: '',
      oder: 0,
      nextSection: 0,
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
      hasNextPart: false, //다음 파트로 진행하기 버튼 토글
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

export const sectionTitleSelectorFamily = selectorFamily<String, SectionID>({
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

//템플릿 생성해주는 selector
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
    ]); //새로운 question을 만듬
    const partIdx = get(targetAtom).part;
    const question = get(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)));
    switch (newValue) {
      case 'birth':
        set(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)), {
          ...question,
          ask: '출생 년도를 알려주세요.',
          multiFl: 0,
        } as IQuestion);
        break;
      case 'phone':
        set(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)), {
          ...question,
          ask: '연락이 가능한 휴대폰 번호를 알려주세요',
          multiFl: 0,
        } as IQuestion);
        break;
      case 'gender':
        set(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)), {
          ...question,
          ask: '성별을 알려주세요.',
          multiFl: 1,
        } as IQuestion);
        const PartFormat = `SCTN${getDateSixDigitsFormatToday()}${numberSet(partIdx)}`;
        const QuestionFormat = `QSTN${getDateSixDigitsFormatToday()}${numberSet(newQuestionIdx)}`;
        const SyscodeFormat = `${PartFormat}${QuestionFormat}` as QuestionItemListID;
        const questionItemIds = get(qusetionItemIdListAtom(SyscodeFormat));
        const newQuestionItemIdx = questionItemIds.length + 1;
        const lastNumber = questionItemIds[questionItemIds.length - 1].slice(-1);
        set(qusetionItemIdListAtom(SyscodeFormat), [
          ...questionItemIds,
          `${SyscodeFormat}${Number(lastNumber) + 1}`,
          `${SyscodeFormat}${Number(lastNumber) + 2}`,
          `${SyscodeFormat}${Number(lastNumber) + 3}`,
        ] as QuestionItemListID[]); //questionItem ID 리스트 새로 생성

        GENDER_ITEM_DATA.forEach((item) => {
          const data = get(qusetionItemListAtomFamily(QuestionItemIDFormat(partIdx, newQuestionItemIdx, item.oder)));
          set(qusetionItemListAtomFamily(QuestionItemIDFormat(partIdx, newQuestionItemIdx, item.oder)), {
            ...data,
            content: item.content,
          } as IQuestionItem);
        });

        break;
      case 'email':
        set(qusetionListAtomFamily(QuestionIDFormat(newQuestionIdx, partIdx)), {
          ...question,
          ask: '연락이 가능한 이메일을 알려주세요.',
          multiFl: 0,
        } as IQuestion);
        break;
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
    //파트의 ID리스트
    const sections = sectionList.map((_, sectionIdx) => {
      const qusetionList = get(qusetionIdListAtom(QuestionListIDFormat(sectionIdx + 1)));
      //질문의 ID리스트
      const questionLit = qusetionList.map((_, questionIdx) => {
        const PartFormat = `SCTN${getDateSixDigitsFormatToday()}${numberSet(sectionIdx + 1)}`;
        const QuestionFormat = `QSTN${getDateSixDigitsFormatToday()}${numberSet(questionIdx + 1)}`;
        const SyscodeFormat = `${PartFormat}${QuestionFormat}` as QuestionItemListID;

        //item의idList
        const questionItemIdList = get(qusetionItemIdListAtom(SyscodeFormat));
        const questionItem = questionItemIdList.map((_, questionItemIdx) => {
          //item 아톰 패밀리를 가져와서 리턴
          return get(
            qusetionItemListAtomFamily(QuestionItemIDFormat(sectionIdx + 1, questionIdx + 1, questionItemIdx + 1))
          );
        });
        //question을 가져와서 questionItem을 담아서 리턴
        const question = get(qusetionListAtomFamily(QuestionIDFormat(questionIdx + 1, sectionIdx + 1)));
        return { ...question, questionItems: questionItem };
      });

      const part = get(sectionListAtomFamily(PartIDFormat(sectionIdx + 1)));
      //part를 가져와서 question을 담아서 리턴
      return { ...part, questions: questionLit };
    });
    const tagList = get(tagState);
    const arrLength = sections.length;
    //다음 섹션 세팅
    const nextSectionPropertySet = sections.map((item, idx) => {
      //마지막 인덱스라면
      if (idx + 1 === arrLength) {
        return { ...item, nextSection: -1 };
      }
      if (item.nextSection === -2) {
        return { ...item, nextSection: idx };
      }
    });
    return { ...surveyData, sections: nextSectionPropertySet, hashtag: [...tagList] } as ISurveyData;
  },
});
