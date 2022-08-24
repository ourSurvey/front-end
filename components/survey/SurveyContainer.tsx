import React, { useRef } from "react";
import styled from "@emotion/styled";
import SurveyItem from "./SurveyItem";
import { useInfiniteGQLQuery } from "hooks/useGQLQuery";
import { GET_SURVEY } from "services/api/survey";
import { IContent } from "types/survey";
import { useObserver } from "hooks/useObserver";
import SurveySkeleton from "components/skeleton/SurveySkeleton";
import { ClipLoader } from "react-spinners";
const Placeholder: React.FC = () => (
  <ItemContainer>
    <UlContainer>
      <SurveySkeleton width={60} height={19} />
      &nbsp;
      <SurveySkeleton width={60} height={19} />
    </UlContainer>
    <SurveySkeleton width={200} height={25} rounded />
    <Content>
      <SurveySkeleton width={98} wUnit="%" height={18} rounded />
      <SurveySkeleton width={170} height={18} rounded />
    </Content>
    <DateContainer>
      <SurveySkeleton width={158} height={14} rounded />
    </DateContainer>
    <SurveySkeleton width={100} wUnit="%" height={36} />

    <Hashtag>
      <SurveySkeleton width={170} height={12} rounded />
    </Hashtag>
  </ItemContainer>
);

const SurveyContainer = () => {
  const bottom = useRef(null);
  const {
    data, //data.pages를 갖고 있는 배열
    error, //error 객체
    fetchNextPage, //다음 페이지를 불러오는 함수
    isFetching, //첫 페이지 fetching 여부, Boolean, 잘 안쓰인다
    isFetchingNextPage, //추가 페이지 fetching 여부, Boolean
    status, //loading, error, success 중 하나의 상태, string
  } = useInfiniteGQLQuery(
    "surveyList",
    GET_SURVEY,
    ({ pageParam = 0 }) => {
      return {
        page: pageParam,
        size: 5,
      };
    },
    {
      // 💡 중요! getNextPageParams가 무한 스크롤의 핵심,
      // getNextPageParam 메서드가 falsy한 값을 반환하면 추가 fetch를 실행하지 않는다
      // falsy하지 않은 값을 return 할 경우 Number를 리턴해야 하며
      // 위의 fetch callback의 인자로 자동으로 pageParam을 전달.
      getNextPageParam: (lastPage: any) => {
        const { getSurveyToPage } = lastPage;
        return getSurveyToPage.data.currentPage + 1;
      },
    }
  );
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <Container>
      {status === "loading" && <Placeholder />}

      {status === "error" && <p>{error.message}</p>}
      {status === "success" && (
        <>
          {data?.pages.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.getSurveyToPage.data.content.map((survey: IContent) => (
                <SurveyItem
                  id={survey.id}
                  key={survey.id}
                  hashtagList={survey.hashtagList}
                  subject={survey.subject}
                  content={survey.content}
                  openFl={survey.openFl}
                  minute={survey.minute}
                  startDate={survey.startDate}
                  endDate={survey.endDate}
                />
              ))}
            </React.Fragment>
          ))}
        </>
      )}
      <div ref={bottom} />

      {isFetching && !isFetchingNextPage ? (
        <div className="spinner">
          <ClipLoader color="#0066D9" />
        </div>
      ) : null}
    </Container>
  );
};

export default SurveyContainer;

const Container = styled.div`
  height: 100%;
  padding: 5px 5px 10px 5px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  & .spinner {
    text-align: center;
  }
`;

const ItemContainer = styled.div`
  padding: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 14px;
  margin-bottom: 24px;
`;

const UlContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 0px;
  padding: 0;
`;

const Content = styled.p`
  & span {
    margin-top: 5px;

    &:last-child {
      margin-bottom: 10px;
    }
  }
`;

const DateContainer = styled.div`
  margin-bottom: 10px;
`;

const Hashtag = styled.div`
  padding-top: 10px;
`;
