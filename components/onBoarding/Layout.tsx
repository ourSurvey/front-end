import React from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import dynamic from "next/dynamic";
const StepProgress = dynamic(() => import("components/StepProgress"), { ssr: false });

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <OnbordingLayout>
      <header>
        <StepProgress />
      </header>
      <div className="wrpper">
        <main>{props.children}</main>
        <footer>
          <UlStyle>
            <li>답변하신 정보는 앞으로 참여하실 설문의 인구통계정보 수집 문항에 자동 입력됩니다.</li>
            <li>입력하신 정보는 설문을 참여할 때마다 수정, 삭제가 가능합니다.</li>
            <li>정보를 입력하지 않아도 서비스를 이용할 수 있습니다.</li>
          </UlStyle>
        </footer>
      </div>
    </OnbordingLayout>
  );
};

export default Layout;

const UlStyle = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;

  & li {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY500 })}
    line-height: 200%;
  }
`;

const OnbordingLayout = styled.div`
  height: 100%;

  & .wrpper {
    height: calc(100% - 56px) !important;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  & h1 {
    margin-top: 44px;
    margin-bottom: 0;
    ${Pretendard({ font: 1.8, weight: 700, color: Common.colors.GY900 })}
  }
`;
