import surveyService from "services/survey.service";
import { QueryClient, dehydrate, DehydratedState } from "react-query";

import HeaderName from "components/HeaderName";
import styled from "@emotion/styled";
import { Pretendard, Common } from "styles/common";
import OutLineButton from "components/common/OutLineButton";
import { Button } from "components/common/Button";
import Share from "components/Share";

interface IProps {
  dehydratedState: DehydratedState;
}

export const getServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["surveyDetail", context.params.surveyId], () =>
    surveyService.surveyDetail(context.params.surveyId, context.req.headers.cookie.split(";")[0].substr(12))
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const SurveyId = ({ dehydratedState }: IProps) => {
  const data: any = dehydratedState.queries[0].state.data;

  const returnDate = (): string => {
    const today = new Date();
    const compareDate = new Date(data.data.data.createdDt);
    const diffDate = today.getTime() - compareDate.getTime();
    const day = diffDate / (1000 * 60 * 60 * 24);
    const hour = diffDate / (1000 * 60 * 60);

    if (day < 1) {
      return `${hour}시간 전`;
    }

    return `${Math.floor(day)}일 전`;
  };
  returnDate();
  return (
    <Detail>
      <header>
        <HeaderName hasBack={true} hasNext={false} name="" />
        <DateContainer>
          {" "}
          <>
            <span>설문 기간 </span>
            {data.data.data.startDate} ~ {data.data.data.endDate}
          </>
        </DateContainer>

        <h1>{data.data.data.subject}</h1>
        <CreateInfo>
          <span>열일하는 거북이</span> <span className="icon">|</span> {returnDate()}
        </CreateInfo>
      </header>
      <Line></Line>

      <Content>
        <p>{data.data.data.content}</p>
      </Content>

      {data.data.data.hashtagList && data.data.data.hashtagList.length > 0 ? (
        <Hashtag>{data.data.data.hashtagList?.map((item: string) => `#${item}`)}</Hashtag>
      ) : null}
      <BtnContainer>
        <OutLineButton isDisabled={false} textColor={Common.colors.GY900} btnText="공유하기" borderColor={Common.colors.GY900} />
        <Button isDisabled={false} textColor="#fff" btnText="설문 참여하기" color={Common.colors.BL500} />
      </BtnContainer>
      <Share />
    </Detail>
  );
};

export default SurveyId;

const DateContainer = styled.span`
  display: block;
  margin-bottom: 8px;
  & span {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })}
  }
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY500 })}
`;

const Detail = styled.main`
  position: relative;
  height: 100%;
  & h1 {
    margin: 0;
    ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })}
    line-height: 150%;

    letter-spacing: -0.03em;
  }
`;

const CreateInfo = styled.p`
  margin-top: 8px;
  margin-bottom: 20px;
  & span {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })}
  }
  & .icon {
    ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY300 })}
  }
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY500 })}
`;

const Line = styled.div`
  width: calc(100% + 20 * 2);

  margin: 0 -20px 0 -20px;
  height: 5px;
  background-color: ${Common.colors.GY50};
`;

const Content = styled.section`
  margin-top: 20px;
  & p {
    ${Pretendard({ font: 1.3, weight: 400, color: Common.colors.GY900 })}
  }
`;

const Hashtag = styled.span`
  margin-top: 20px;
  display: -webkit-box;
  ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })};
  line-height: 150%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: -0.03em;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  bottom: 0;
  & button {
    &:first-of-type {
      width: 40%;
      margin-right: 10px;
    }
    &:last-child {
      box-shadow: 0px 6px 6px rgba(124, 113, 255, 0.25);
    }
  }
`;
