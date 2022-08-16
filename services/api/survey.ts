import gql from "graphql-tag";

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
          startDate
          endDate
          createdDt
          hashtagList
        }
      }
    }
  }
`;
