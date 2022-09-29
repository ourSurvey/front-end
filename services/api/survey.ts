import { ISurveyData } from './../../types/survey';
import gql from 'graphql-tag';
import ApiClient from 'services/ApiClient';

const api = new ApiClient();
export const GET_SURVEY = gql`
  query ($page: Int!, $size: Int!) {
    getSurveyToPage(page: $page, size: $size) {
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

export const createSurvey = (surveyData: ISurveyData) => api.post('/survey', surveyData);
