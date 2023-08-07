import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import Close from 'public/icon/close.svg';
import { tagState } from 'states/tag';
import { Common, Pretendard } from 'styles/common';

interface Iprops {
  text: string;
}

const Chip = ({ text }: Iprops) => {
  const [TagState, setTagState] = useRecoilState(tagState);

  const deleteTagHandler = () => {
    setTagState(TagState.filter((item) => item !== text));
  };
  return (
    <ChipStyle>
      #&nbsp;{text}
      <Close width="8" height="8" onClick={deleteTagHandler} fill={Common.colors.GY500} />
    </ChipStyle>
  );
};

export default Chip;

const ChipStyle = styled.li`
  display: flex;
  align-items: center;
  background-color: ${Common.colors.GY50};
  border: 1px solid ${Common.colors.GY200};
  height: 28px;
  width: auto;

  border-radius: 90px;
  padding: 4px 8px;
  ${Pretendard({ font: 1.3, weight: 400, color: Common.colors.GY900 })};
  line-height: 150%;
  text-align: center;

  & svg {
    margin-left: 5px;
  }
`;
