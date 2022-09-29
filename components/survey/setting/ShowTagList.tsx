import Chip from 'components/survey/setting/Chip';
import styled from '@emotion/styled';
import { tagState } from 'states/tag';
import { useRecoilValue } from 'recoil';
const ShowTagList = () => {
  const tagList = useRecoilValue(tagState);
  return (
    <TagListContainer>
      {tagList.map((item) => (
        <Chip key={item} text={item} />
      ))}
    </TagListContainer>
  );
};

export default ShowTagList;

const TagListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 12px;
  max-height: calc(100% - 151px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0;
  padding-left: 0;
`;
