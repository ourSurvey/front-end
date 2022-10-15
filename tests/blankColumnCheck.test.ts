import { isHaveBlankColumn } from './../utills/blankColumnCheck';
const data = {
  id: '',
  subject:
    '수료 후 취업 활동 계획을 파악하기 위한 설문조사입니다. 현재 생각중인 취업 활동 계획에 따라 솔직한 답변 부탁드립니다.',
  content: '[프론트 6차] 취업 활동 계획 조사',
  startDate: '',
  endDate: '',
  minute: 1,
  openFl: 1,
  tempFl: 0,
  closingComment: '설문이 종료되었습니다|응답해주셔서 감사합니다.',
  hashtag: ['원티드', '설문', '6차'],
  sections: [
    {
      id: 'SCTN220923A001',
      title: '기본정보 입력 파트',
      content: '',
      nextSection: -1,
      questions: [
        {
          id: 'QSTN1220923A001',
          ask: '본인의 이름을 한글로 작성해주세요.',
          descrip: '',
          multiFl: 0,
          essFl: 1,
          randomShowFl: 0,
          dupFl: 0,
          oder: 0,
          hasNextPart: false,
          questionItems: [
            {
              id: 'QSTI111220923A001',
              content: '',
              oder: 0,
              nextSection: 0,
            },
          ],
        },
        {
          id: 'QSTN1220923A002',
          ask: '현재 재직 여부를 선택해주세요.',
          descrip: '',
          multiFl: 1,
          essFl: 1,
          randomShowFl: 0,
          dupFl: 0,
          oder: 0,
          hasNextPart: false,
          questionItems: [
            {
              id: 'QSTI121220923A001',
              content: '재직중',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI122220923A002',
              content: '구직중',
              oder: 0,
              nextSection: 0,
            },
          ],
        },
        {
          id: 'QSTN1220923A003',
          ask: '코스 참가 지원 시점 기준 미취업 또는 실업 상태 기간을 선택해주세요.',
          descrip: '인턴, 아르바이트의 경우도 미취업 또는 실업 상태에 포함됩니다.',
          multiFl: 1,
          essFl: 1,
          randomShowFl: 0,
          dupFl: 0,
          oder: 0,
          hasNextPart: false,
          questionItems: [
            {
              id: 'QSTI131220923A001',
              content: '재직중',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI132220923A002',
              content: '5개월 이하',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI133220923A003',
              content: '6개월 이상',
              oder: 0,
              nextSection: 0,
            },
          ],
        },
      ],
    },
    {
      id: 'SCTN220923A002',
      title: '세부정보 입력란',
      content: '',
      nextSection: 1,
      questions: [
        {
          id: 'QSTN2220923A001',
          ask: '집중 취업 지원 대상에 해당하는 항목을 선택해주세요.',
          descrip:
            '1 - 참고) 가구원 세전소득 합계 기준 - 정부 블로그 | 2022년 기준 중위 소득  3 - 참고) 본인 세전소득 기준 - 2020년 : 2,284,352원/월 이하 / 2021년 : 2,376,180원/월 이하',
          multiFl: 1,
          essFl: 1,
          randomShowFl: 0,
          dupFl: 0,
          oder: 0,
          hasNextPart: false,
          questionItems: [
            {
              id: 'QSTI211220923A001',
              content: '1 - (가구 소득 기준) 가구원 세전소득 합계가 기준중위소득 90% 이하',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI212220923A002',
              content: '2 - (가구 소득 기준) 한국장학재단 학자금 지원구간 4구간 이하인 20-39세 청년',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI213220923A003',
              content: '3 - (본인 소득 기준) 본인 세전소득이 1인가구 기준중위소득 130% 이하인 20-39세 청년',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI214220923A004',
              content:
                '4 - 임신, 출산, 육아 등 가족구성원 돌봄의 이유로 경제 활동 중단 / 중단 위기의 20-49세 경력 보유 여성',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI215220923A005',
              content:
                '5 - 북한이탈주민, 결혼이민자, 결혼이민자 중도입국자녀, 장애인, 한부모 가족의 부모에 해당하는 20-49세',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI216220923A006',
              content: '해당 사항이 없습니다.',
              oder: 0,
              nextSection: 0,
            },
          ],
        },
        {
          id: 'QSTN2220923A002',
          ask: '수료 후 취업 계획을 선택해주세요.',
          descrip: '',
          multiFl: 1,
          essFl: 1,
          randomShowFl: 0,
          dupFl: 0,
          oder: 0,
          hasNextPart: false,
          questionItems: [
            {
              id: 'QSTI221220923A001',
              content: '수료 후 1개월 안으로 취업/이직을 희망합니다.',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI222220923A002',
              content: '수료 후 3개월 안으로 취업/이직을 희망합니다.',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI223220923A003',
              content: '수료 후 6개월 안으로 취업/이직을 희망합니다.',
              oder: 0,
              nextSection: 0,
            },
            {
              id: 'QSTI224220923A004',
              content: '취업/이직이 아닌 역량 향상을 목표로 코스에 참가중입니다.',
              oder: 0,
              nextSection: 0,
            },
          ],
        },
      ],
    },
  ],
};

describe('서베이 객체 빈값 체크', () => {
  test('모두 입력 되었을 때는 false를 리턴해야 한다.', () => {
    expect(isHaveBlankColumn(data)).toBe(false);
  });

  test('파트 명이 입력되지 않았을 때에는 true를 리턴해야 한다.', () => {
    const noPartTitle = { ...data };
    noPartTitle.sections[0].title = '';
    expect(isHaveBlankColumn(noPartTitle)).toBe(true);
  });

  test('질문 제목이 입력되지 않았을 때에는 true를 리턴해야 한다.', () => {
    const noQuestionTitle = { ...data };
    noQuestionTitle.sections[1].questions[1].ask = '';
    expect(isHaveBlankColumn(noQuestionTitle)).toBe(true);
  });

  test('질문지 보기가 입력되지 않았을 때에는 true를 리턴해야 한다.', () => {
    const noQuestionItmesTitle = { ...data };
    noQuestionItmesTitle.sections[1].questions[1].questionItems[3].content = '';
    expect(isHaveBlankColumn(noQuestionItmesTitle)).toBe(true);
  });
});
