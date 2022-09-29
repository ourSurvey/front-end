import Close from 'public/icon/close.svg';

import styled from '@emotion/styled';
import { Pretendard, Common, SpaceBetween } from 'styles/common';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PartIDFormat } from 'utills/getDateSixth';
import { sectionListAtomFamily } from 'states/survey';
interface IProps {
  setVisible: (bool: boolean) => void;
  partNum: number;
  partName: string;
  partLength: number;
}

const NextPartSectionModal = ({ setVisible, partNum, partName, partLength }: IProps) => {
  const [selectedSection, setselectedSection] = useState('nextPart');
  //클릭한 파트 번호를 제외한 배열 생성
  const partIndexArray = Array.from({ length: partLength }, (_, index) => index + 1).filter((item) => item !== partNum);

  return (
    <Container>
      <Absolute>
        <div>
          <TitleContainer>
            <strong>Part{partNum}.</strong>
            <PartTitle>{partName === '' ? '(제목없음)' : partName}</PartTitle>
          </TitleContainer>
          <Description>다음으로 어디로 이동할까요?</Description>
        </div>

        <Close width="14" height="14" onClick={() => setVisible(false)} fill={Common.colors.GY900} />
      </Absolute>

      <Line />

      <UlContainer>
        <li onClick={() => setselectedSection('nextPart')} className={selectedSection === 'nextPart' ? 'active' : ''}>
          다음 파트로 진행하기
        </li>
        {partIndexArray.map((item) => {
          const part = useRecoilValue(sectionListAtomFamily(PartIDFormat(item)));
          return (
            <li
              key={part.id}
              onClick={() => setselectedSection(`${item - 1}`)}
              className={selectedSection === `${item - 1}` ? 'active' : ''}
            >
              Part{item}. {part.title === '' ? '(제목없음)' : part.title}
            </li>
          );
        })}
        <li onClick={() => setselectedSection('send')} className={selectedSection === 'send' ? 'active' : ''}>
          설문 제출하기
        </li>
      </UlContainer>
    </Container>
  );
};

export default NextPartSectionModal;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Absolute = styled.div`
  ${SpaceBetween()}
`;

const PartTitle = styled.span`
  margin-left: 4px;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY700 })};
  line-height: 150%;
`;

const TitleContainer = styled.div`
  display: flex;
  width: calc(100% - 14px);
  & strong {
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GR500 })};
    line-height: 150%;
  }
`;

const Description = styled.span`
  ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })};
  line-height: 150%;
`;

const Line = styled.div`
  width: calc(100% + 25 * 2);
  height: 2px;
  margin: 25px -25px;
  background-color: ${Common.colors.GY200};
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
