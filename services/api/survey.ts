import { CreateSurveyData } from './../../types/survey';
import gql from 'graphql-tag';
import ApiClient from 'services/ApiClient';

const api = new ApiClient();
export const GET_SURVEY = gql`
  query ($page: Int!, $size: Int!, $searchText: String) {
    getSurveyToPage(page: $page, size: $size, searchText: $searchText) {
      code
      message
      data {
        totalElements
        totalPages
        isLast
        currentPage
        content {
          subject
          content
          openFl
          minute
          id
          startDate
          endDate
          createdDt
          hashtagList
        }
      }
    }
  }
`;

export const getTagList = (tagString: string) => api.get(`/hashtag/${tagString}`);

export const createSurvey = (surveyData: CreateSurveyData) => api.post('/survey', surveyData);

export const isHaveSurveyTemp = () => api.get('/my/survey/temp');

export const getMySurveies = (status: null | -1 | 0 | 1) =>
  api.get(`/my/survey?status=${status === null ? '' : status}`);
