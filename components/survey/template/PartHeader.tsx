import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import InvertedTriangle from 'public/icon/inverted-triangle.svg';
import { sectionListAtomFamily } from 'states/survey';
import { Common, Pretendard, AlignAndJustifyCenter, SpaceBetween } from 'styles/common';
import { type QuestionListID } from 'types/survey';
import { PartIDFormat } from 'utills/getDateSixth';
import QusetionTitle from './QusetionTitle';

interface IProps {
  PartNum: number;
  ListLength: number;
  questionIdList: QuestionListID[];
  hideList: boolean;
  foldList: () => void;
}

interface IStyle {
  PartNum: number;
}

const PartHeader = ({ PartNum, ListLength, questionIdList, hideList, foldList }: IProps) => {
  const [partData, setPartData] = useRecoilState(sectionListAtomFamily(PartIDFormat(PartNum + 1)));
  return (
    <Header>
      <LeftLine PartNum={PartNum}></LeftLine>
      <SubjectContainer>
        <div>
          <PartTitle PartNum={PartNum}>
            <h1>PART {PartNum + 1}</h1>
            <span className="total-step">/{ListLength}</span>
          </PartTitle>
          <QusetionCount>
            <span>총 {questionIdList.length}개 질문</span>
          </QusetionCount>
        </div>
        <FoldButton>
          접기
          <InvertedTriangle
            fill={(PartNum + 1) % 2 === 0 ? Common.colors.BL500 : Common.colors.GR500}
            transform={hideList ? 'rotate(180)' : 'rotate(0)'}
            onClick={foldList}
          />
        </FoldButton>
      </SubjectContainer>

      <div className="qustion-title">
        <QusetionTitle setValue={setPartData} value={partData} placeHolder="파트" hasImageInput={false} />
      </div>
    </Header>
  );
};

export default PartHeader;

const Header = styled.header`
  position: relative;
  padding: 0 20px;
  padding-top: 1.5rem;
  background-color: ${Common.colors.GY50};
  & .qustion-title {
  }
`;

const LeftLine = styled.div<IStyle>`
  position: absolute;
  width: 8px;
  height: 100%;
  z-index: 1;
  background-color: ${({ PartNum }) => ((PartNum + 1) % 2 === 0 ? Common.colors.BL500 : Common.colors.GR500)};
  left: 0;
  top: 0;
`;

const FoldButton = styled.div`
  ${AlignAndJustifyCenter()};
  border: 1px solid ${Common.colors.GY300};
  position: absolute;
  right: 20px;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2px;
  background: #fff;
  padding: 0 4px;
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY900 })};
  line-height: 150%;

  & svg {
    margin-left: 2px;
  }
`;

const PartTitle = styled.div<IStyle>`
  & h1 {
    display: inline;
    ${(props) =>
      Pretendard({
        font: 1.6,
        weight: 700,
        color: (props.PartNum + 1) % 2 === 0 ? Common.colors.BL500 : Common.colors.GR500,
      })};
    line-height: 150%;
  }
  & .total-step {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY300 })};
    line-height: 150%;
  }
`;

const SubjectContainer = styled.div`
  position: relative;
  ${SpaceBetween()}
`;

const QusetionCount = styled.div`
  & span {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
    line-height: 150%;
  }
  & svg {
    margin-left: 6px;
  }
`;
