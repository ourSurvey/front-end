import Close from 'public/icon/close.svg';
import styled from '@emotion/styled';
import { Pretendard, Common } from 'styles/common';
import { useRecoilValue, useRecoilState } from 'recoil';
import { PartIDFormat, QuestionItemListUniqueNumber } from 'utills/getDateSixth';
import { sectionListAtomFamily, qusetionItemListAtomFamily } from 'states/survey';
import { QuestionItemListID } from 'types/survey';
import { QuestionItemIDFormat } from 'utills/getDateSixth';

interface IProps {
  setVisible: (bool: boolean) => void;
  partNum: number;
  partLength: number;
  questionNum: number;
  selectionNumber: QuestionItemListID;
}

const NextPartSelectionInSelectionInput = ({
  setVisible,
  partNum,
  partLength,
  questionNum,
  selectionNumber,
}: IProps) => {
  const [inputContent, setInputContent] = useRecoilState(
    qusetionItemListAtomFamily(
      QuestionItemIDFormat(partNum, questionNum, QuestionItemListUniqueNumber(selectionNumber))
    )
  );
  const partIndexArray = Array.from({ length: partLength }, (_, index) => index + 1).filter((item) => item !== partNum);
  return (
    <Container>
      <Close width="14" height="14" onClick={() => setVisible(false)} fill={Common.colors.GY900} />
      <UlContainer>
        <li
          onClick={() => setInputContent({ ...inputContent, nextSection: -2 })}
          className={inputContent.nextSection === -2 ? 'active' : ''}
        >
          다음 파트로 진행하기
        </li>
        {partIndexArray.map((item) => {
          const part = useRecoilValue(sectionListAtomFamily(PartIDFormat(item)));
          return (
            <li
              key={part.id}
              onClick={() => setInputContent({ ...inputContent, nextSection: item - 1 })}
              className={inputContent.nextSection === item - 1 ? 'active' : ''}
            >
              Part{item}. {part.title === '' ? '(제목없음)' : part.title}
            </li>
          );
        })}
        <li
          onClick={() => setInputContent({ ...inputContent, nextSection: -1 })}
          className={inputContent.nextSection === -1 ? 'active' : ''}
        >
          설문 제출하기
        </li>
      </UlContainer>
    </Container>
  );
};

export default NextPartSelectionInSelectionInput;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  & svg {
    position: absolute;
    right: 0;
  }
`;

const UlContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  max-height: 60%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  & li {
    ${Pretendard({ font: 1.4, weight: 400, color: '#000' })};
    line-height: 150%;
  }
  & li:not(:last-of-type) {
    margin-bottom: 24px;
  }

  & .active {
    font-weight: 700 !important;
    &::before {
      content: url('images/checkedCheck.svg');
      margin-right: 4px;
      width: 10px;
    }
  }
`;
