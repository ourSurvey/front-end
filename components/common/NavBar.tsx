import styled from '@emotion/styled';
import Link from 'next/link';
import Home from 'public/icon/home.svg';
import Survey from 'public/icon/survey.svg';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import { useRouter } from 'next/router';
type ComponentProps = {
  width: number;
  height: number;
  selected?: string;
};

const Add: React.FC<ComponentProps> = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="19.5" r="9.5" transform="rotate(-90 10 19.5)" fill="#F292B7" />
    <circle cx="20" cy="28.5" r="9.5" fill="#0066D9" />
    <circle cx="30" cy="19.5" r="9.5" transform="rotate(-90 30 19.5)" fill="#00AC62" />
    <circle cx="20" cy="9.5" r="9.5" fill="#0066D9" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.4863 18.9864C14.6486 18.7286 10.7714 14.8515 10.5136 10.0137C15.3514 10.2714 19.2286 14.1486 19.4863 18.9864Z"
      fill="#F292B7"
    />
    <rect x="19" y="11" width="3" height="16" rx="1.5" fill="white" />
    <rect x="12.5" y="20.5" width="3" height="16" rx="1.5" transform="rotate(-90 12.5 20.5)" fill="white" />
  </svg>
);

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

const NavBar = () => {
  const router = useRouter();

  return (
    <NavBarContainer>
      <li>
        <Link href="/">
          <a>
            <Home width="24 " height="27" stroke={router.asPath === '/' ? Common.colors.BL500 : Common.colors.GY900} />
            <Span>홈</Span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/survey">
          <a>
            <Survey
              width="30"
              height="27"
              stroke={router.asPath === '/survey' ? Common.colors.BL500 : Common.colors.GY900}
            />
            <Span>서베이</Span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/survey/create">
          <a>
            <Add width={40} height={40} />
          </a>
        </Link>
      </li>
      <li>
        <Link href="/mySurvey">
          <a>
            <PhoneSurvey
              width={25}
              height={27}
              selected={router.asPath === '/mypage' ? Common.colors.BL500 : Common.colors.GY900}
            />
            {/* <PhoneSurvey width="30" height="27" stroke="blue" /> */}
            <Span>나의 서베이</Span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/more">
          <a>
            <More
              width={25}
              height={27}
              selected={router.asPath === '/more' ? Common.colors.BL500 : Common.colors.GY900}
            />
            <Span>더보기</Span>
          </a>
        </Link>
      </li>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.ul`
  ${SpaceBetween()}
  position: fixed;
  background-color: #fff;
  width: 100%;
  bottom: 0; //주소창 때문에 임시로 걸어둔 것 추후 0으로 변경할 것!!
  margin: 0 -20px 0 -20px;
  list-style-type: none;

  padding: 7.5px 20px;
  /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 2 px 0px inset; */
  border-top: 1px solid ${Common.colors.GY100};
  & nav {
    ${SpaceBetween()};
    width: 100%;
  }
  & li {
    & a {
      ${SpaceBetween()};
      flex-direction: column;
      align-items: center;

      height: 45px;
    }
  }
`;

const Span = styled.span`
  margin-top: 3px;
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY900 })}
  line-height:150%;
`;
