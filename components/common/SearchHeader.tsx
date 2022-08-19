import styled from "@emotion/styled";
import Prev from "public/icon/prevArrow.svg";
import Search from "public/icon/search.svg";
import { Common, Pretendard } from "styles/common";
import { useRouter } from "next/router";

type Props = {
  name: string;
  hasBack: boolean;
  hasSearch: boolean;
};

const SearchHeader = (props: Props) => {
  const { name, hasBack, hasSearch } = props;
  const router = useRouter();
  const Span = styled.span`
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })};

    margin-left: ${!hasBack ? "20px" : ""};
    margin-right: ${!hasSearch ? "20px" : ""};
  `;

  return (
    <Header>
      <SvgPosition onClick={() => router.back()}>{hasBack ? <Prev width="20" height="16" /> : null}</SvgPosition>
      <Span>{name}</Span>
      <SvgPosition>{hasSearch ? <Search /> : null}</SvgPosition>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 41px;

  & .name {
    @include Pretendard(1.4, 700, $GY900);
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

export default SearchHeader;
