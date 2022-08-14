import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Common, Pretendard } from "styles/common";
import { useRouter } from "next/router";

type Props = {
  name: string;
  hasBack: boolean;
  hasNext: boolean;
};

const HeaderName = (props: Props) => {
  const { name, hasBack, hasNext } = props;
  const router = useRouter();
  const Span = styled.span`
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })};
    margin-left: ${!hasBack ? "20px" : ""};
    margin-right: ${!hasNext ? "20px" : ""};
  `;

  return (
    <Header>
      <Arrow>
        {hasBack ? (
          <IconContext.Provider value={{ size: "20" }}>
            <IoIosArrowBack onClick={() => router.back()} />
          </IconContext.Provider>
        ) : (
          ""
        )}
      </Arrow>
      <Span>{name}</Span>
      <Arrow>
        {hasNext ? (
          <IconContext.Provider value={{ size: "20" }}>
            <IoIosArrowForward />
          </IconContext.Provider>
        ) : (
          ""
        )}
      </Arrow>
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
const Arrow = styled.div`
  position: relative;
  top: 25%;
  -webkit-transform: translateY(25%);
  -ms-transform: translateY(25%);
  transform: translateY(25%);
`;

export default HeaderName;
