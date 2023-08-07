import { memo } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Prev from 'public/icon/prevArrow.svg';
import Search from 'public/icon/search.svg';
import { Common, Pretendard, SpaceBetween } from 'styles/common';

interface Props {
  name: string;
  hasBack: boolean;
  hasSearch: boolean;
}

interface IStyle {
  hasBack: boolean;
  hasSearch: boolean;
}

const SearchHeader = (props: Props) => {
  const { name, hasBack, hasSearch } = props;
  const router = useRouter();

  return (
    <Header>
      <SvgPosition
        onClick={() => {
          router.back();
        }}
      >
        {hasBack ? <Prev width="20" height="16" /> : null}
      </SvgPosition>
      <Span hasBack={hasBack} hasSearch={hasSearch}>
        {name}
      </Span>
      <SvgPosition>{hasSearch ? <Search /> : null}</SvgPosition>
    </Header>
  );
};

export default memo(SearchHeader);

const Header = styled.header`
  ${SpaceBetween()}
  margin-bottom: 41px;

  & .name {
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })}
  }
  & .arrow {
    position: relative;
    top: 25%;
    -webkit-transform: translateY(25%);
    -ms-transform: translateY(25%);
    transform: translateY(25%);
  }
`;
const SvgPosition = styled.div`
  position: relative;
  top: 25%;
  -webkit-transform: translateY(25%);
  -ms-transform: translateY(25%);
  transform: translateY(25%);
`;

const Span = styled.span<IStyle>`
  ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })};

  margin-left: ${(props) => (!props.hasBack ? '20px' : '')};
  margin-right: ${(props) => (!props.hasSearch ? '20px' : '')};
`;
