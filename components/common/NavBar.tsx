import styled from "@emotion/styled";
import Link from "next/link";
import Home from "public/icon/home.svg";
import More from "public/icon/more.svg";
import PhoneSurvey from "public/icon/phone-survey.svg";
import Survey from "public/icon/survey.svg";
import NavAdd from "public/icon/nav-add.svg";
import { Common, Pretendard } from "styles/common";
type Props = {};

const NavBar = (props: Props) => {
  return (
    <NavBarContainer>
      <li>
        <Link href="/mmmm">
          <>
            <Home width="22" height="27" stroke="#000" />
            <Span>홈</Span>
          </>
        </Link>
      </li>
      <li>
        <Link href="/survey">
          <>
            <Survey width="30" height="27" />
            <Span>서베이</Span>
          </>
        </Link>
      </li>
      <li>
        <Link href="/add">
          <NavAdd width="40" height="40" />
        </Link>
      </li>
      <li>
        <Link href="/mypage">
          <>
            <PhoneSurvey width="30" height="27" />
            <Span>나의 서베이</Span>
          </>
        </Link>
      </li>
      <li>
        <Link href="/more">
          <>
            <More width="28" height="27" />
            <Span>더보기</Span>
          </>
        </Link>
      </li>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.ul`
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 30px; //주소창 때문에 임시로 걸어둔 것 추후 0으로 변경할 것!!
  margin: 0 -20px 0 -20px;
  list-style-type: none;
  justify-content: space-between;
  padding: 7.5px 20px;
  /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 2 px 0px inset; */
  border-top: 1px solid ${Common.colors.GY100};
  & li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 45px;
  }
`;

const Span = styled.span`
  margin-top: 3px;
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY900 })}
  line-height:150%;
`;
