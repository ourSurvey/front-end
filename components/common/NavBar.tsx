import styled from "@emotion/styled";
import Link from "next/link";
import Home from "public/icon/home.svg";
import Survey from "public/icon/survey.svg";
import NavAdd from "public/icon/nav-add.svg";
import { Common, Pretendard } from "styles/common";
type Props = {};
type ComponentProps = {
  width: number;
  height: number;
  selected: string;
};

const PhoneSurvey: React.FC<ComponentProps> = ({ width, height, selected }) => (
  <svg width={width} height={height} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 1H16C16.5523 1 17 1.44772 17 2V18C17 18.5523 16.5523 19 16 19H2C1.44772 19 1 18.5523 1 18V2C1 1.44772 1.44772 1 2 1Z"
      stroke={selected}
      strokeWidth="2"
    />
    <circle cx="9" cy="7" r="2" fill={selected} />
    <path
      d="M14 15C14 14.3434 13.8707 13.6932 13.6194 13.0866C13.3681 12.48 12.9998 11.9288 12.5355 11.4645C12.0712 11.0002 11.52 10.6319 10.9134 10.3806C10.3068 10.1293 9.65661 10 9 10C8.34339 10 7.69321 10.1293 7.08658 10.3806C6.47995 10.6319 5.92876 11.0002 5.46447 11.4645C5.00017 11.9288 4.63188 12.48 4.3806 13.0866C4.12933 13.6932 4 14.3434 4 15L9 15H14Z"
      fill={selected}
    />
  </svg>
);

const More: React.FC<ComponentProps> = ({ width, height, selected }) => (
  <svg width={width} height={height} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="2" rx="1" fill={selected} />
    <rect x="1.5" y="6" width="13" height="2" rx="1" fill={selected} />
    <rect y="12" width="16" height="2" rx="1" fill={selected} />
  </svg>
);

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
