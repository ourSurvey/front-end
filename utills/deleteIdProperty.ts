import { getDateFormat } from './getDateSixth';
import { ISurveyData } from 'types/survey';
export const deleteIDproperty = (object: ISurveyData) => {
  const sectionArr = [...object.sections];
  const newArr = sectionArr.map((item) => {
    const questionList = item.questions.map((qusetion) => {
      const questionItemList = qusetion.questionItems.map((questionItem) => {
        const { id, ...questionItemProperties } = questionItem;
        return questionItemProperties;
      });

      const { id, ...questionProperties } = qusetion;
      return { ...questionProperties, questionItems: questionItemList };
    });

    const { id, ...sectionProperties } = item;
    return { ...sectionProperties, questions: questionList };
  });
  const start = getDateFormat(object.startDate).replaceAll('.', '-');
  const end = getDateFormat(object.endDate).replaceAll('.', '-');
  return { ...object, startDate: start, endDate: end, sections: newArr };
};
