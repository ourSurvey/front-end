import { ISurveyData } from 'types/survey';

//빈칸이 있으면 true
export const isHaveBlankColumn = (survey: ISurveyData) => {
  let bool = false;
  console.log(survey);

  for (let i = 0; i < survey.sections.length; i++) {
    for (let j = 0; j < survey.sections[i].questions.length; j++) {
      const { multiFl, ask } = survey.sections[i].questions[j];
      for (let k = 0; k < survey.sections[i].questions[j].questionItems.length; k++) {
        const content = survey.sections[i].questions[j].questionItems[k].content;
        if (multiFl === 1 && content === '') bool = true; //질문이 객관식이고, 질문지가 비어있으면 true
      }
      if (ask === '') bool = true; //질문 제목이 비어있으면 true
    }
    const { title } = survey.sections[i];
    if (title === '') bool = true; //파트 제목이 비어있으면 true
  }

  return bool;
};
