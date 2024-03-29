import styled from '@emotion/styled';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import Plus from 'public/icon/plus-blue.svg';
import { tagState } from 'states/tag';
import { Common, Pretendard } from 'styles/common';
import Chip from './Chip';

const AddTag = () => {
  const TagState = useRecoilValue(tagState);
  return (
    <TagAdd>
      <h1>태그를 추가해주세요</h1>
      <span>선택 사항입니다.</span>
      <Link href="/write/addTag">
        <a>
          <Plus />
          <span className="tag-btn">태그 추가하기</span>
        </a>
      </Link>

      <UlContainer>
        {TagState.map((item) => (
          <Chip text={item} key={item} />
        ))}
      </UlContainer>
    </TagAdd>
  );
};

export default AddTag;

const TagAdd = styled.section`
  background-color: #fff;
  padding: 0 20px;
  padding-top: 24px;
  padding-bottom: 32px;
  & span {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
  }
  & .tag-btn {
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })}
  }

  & a {
    margin: 18px 0;
    display: flex;
    align-items: center;

    & svg {
      margin-right: 6px;
    }
  }
`;

const UlContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: nowrap;

  padding: 0;
  margin: 0;
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  & li {
    flex: 0 0 auto;
  }

  & li:not(:last-of-type) {
    margin-right: 12px;
  }
`;
