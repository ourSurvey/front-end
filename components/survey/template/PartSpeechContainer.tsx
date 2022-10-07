import styled from '@emotion/styled';
import Part from './Part';
import SpeechBubble from './SpeechBubble';
import { SectionID } from 'types/survey';
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
      <SpeechBubble partLength={ListLength} partNum={PartNum + 1} color={(PartNum + 1) % 2 === 0 ? 'pink' : 'green'} />
    </PartSpeech>
  );
};

export default PartSpeechContainer;

const PartSpeech = styled.div`
  background-color: #fff;
  padding-bottom: 24px;
  margin-bottom: 10px;
`;
