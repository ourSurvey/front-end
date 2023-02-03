import { IMockTemp } from './types';
import { rest } from 'msw';

export const handler = [
  rest.get('/getTemp', async (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<IMockTemp>({
        data: {
          finCount: 0,
          ingCount: 0,
          replyCount: 0,
          tempCount: 3,
          willCount: 36,
          list: [
            {
              startDate: '2023.01.01',
              endDate: '2023.01.31',
              id: 'SUVY221020A001',
              replyCount: 123,
              status: 1,
              subject: '편의점 라면 소비 패턴 조사를 위한 설문1',
              tempFl: 0,
            },
            {
              startDate: '2023.01.01',
              endDate: '2023.01.31',
              id: 'SUVY221020A002',
              replyCount: 0,
              status: 1,
              subject: '편의점 라면 소비 패턴 조사를 위한 설문2',
              tempFl: 0,
            },
            {
              startDate: '2023.02.15',
              endDate: '2023.02.28',
              id: 'SUVY221020A003',
              replyCount: 123,
              status: 1,
              subject: '편의점 라면 소비 패턴 조사를 위한 설문3',
              tempFl: 0,
            },
            {
              startDate: '2023.01.01',
              endDate: '2023.03.31',
              id: 'SUVY221020A004',
              replyCount: 123,
              status: 1,
              subject: '편의점 라면 소비 패턴 조사를 위한 설문4',
              tempFl: 0,
            },
            {
              startDate: '2023.01.01',
              endDate: '2023.03.31',
              id: 'SUVY221020A005',
              replyCount: 0,
              status: 1,
              subject: '편의점 라면 소비 패턴 조사를 위한 설문5',
              tempFl: 0,
            },
            {
              startDate: '2022.12.01',
              endDate: '2023.01.27',
              id: 'SUVY221020A006',
              replyCount: 123,
              status: 1,
              subject: '편의점 라면 소비 패턴 조사를 위한 설문6',
              tempFl: 0,
            },
          ],
        },
      })
    );
  }),
];
