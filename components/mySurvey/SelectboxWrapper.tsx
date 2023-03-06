import { IMySurveyData } from './Written';
import styled from '@emotion/styled';
import SurveyBox from './SurveyBox';
interface IProps {
  surveies: IMySurveyData[];
}

const SelectboxWrapper = ({ surveies }: IProps) => {
  return (
    <WrittenContainer>
      {surveies.map((item: IMySurveyData) => {
        return (
          <SurveyBox
            key={item.id}
            startDate={item.startDate}
            endDate={item.endDate}
            subject={item.subject}
            replyCount={item.replyCount}
          />
        );
      })}
    </WrittenContainer>
  );
};

export default SelectboxWrapper;

const WrittenContainer = styled.article`
  padding: 12px 5px 5px 5px;
  overflow-y: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  & .survey-box:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  & .survey-box:last-of-type {
    margin-bottom: 30px;
  }
`;
