import styled from "@emotion/styled";
import { Pretendard, Common } from "styles/common";
interface IProps {
  title: string;
  isRequired: boolean;
  hasContent: boolean;
}

const TosItem = (props: IProps) => {
  const { title, isRequired, hasContent } = props;
  return (
    <Container>
      <div>
        <Title>{title}</Title>
        {isRequired ? <RequireSpan>&nbsp;(필수)</RequireSpan> : ""}
      </div>
      {hasContent ? <ContentSpan>내용보기</ContentSpan> : ""}
    </Container>
  );
};

export default TosItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & div {
    display: flex;
  }
`;

const Title = styled.span`
  ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
`;

const RequireSpan = styled.span`
  ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })}
`;

const ContentSpan = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.BL400 })}
  text-decoration:underline;
`;
