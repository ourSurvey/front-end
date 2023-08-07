import gql from 'graphql-tag';
import ApiClient from 'services/ApiClient';
import { type CreateSurveyData } from './../../types/survey';

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

export const getTagList = async (tagString: string) => await api.get(`/hashtag/${tagString}`);

export const createSurvey = async (surveyData: CreateSurveyData) => await api.post('/survey', surveyData);
