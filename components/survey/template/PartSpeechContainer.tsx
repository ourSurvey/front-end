import styled from '@emotion/styled';
import { type SectionID } from 'types/survey';
import Part from './Part';
import SpeechBubble from './SpeechBubble';
interface IProps {
  PartNum: number;
  ListLength: number;
  setVisibleMore: (bool: boolean) => void;
  partID: SectionID;
}

const PartSpeechContainer = ({ PartNum, ListLength, setVisibleMore, partID }: IProps) => {
  return (
    <PartSpeech>
      <Part partID={partID} setVisibleMore={setVisibleMore} ListLength={ListLength} PartNum={PartNum} />
      <SpeechBubble partLength={ListLength} partNum={PartNum + 1} color={(PartNum + 1) % 2 === 0 ? 'blue' : 'green'} />
    </PartSpeech>
  );
};

export default PartSpeechContainer;

const PartSpeech = styled.div`
  background-color: #fff;
  padding-bottom: 24px;
`;
