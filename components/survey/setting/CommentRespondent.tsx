import React from 'react';
import styled from '@emotion/styled';
import { Common, Pretendard } from 'styles/common';

interface IProps {
  setClosinTitle: (e: string) => void;
  setclosingComment: (e: string) => void;
  closingComment: string;
  closinTitle: string;
}

const CommentRespondent = ({ setClosinTitle, setclosingComment, closingComment, closinTitle }: IProps) => {
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClosinTitle(e.target.value);
  };

  const onSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setclosingComment(e.target.value);
  };

  return (
    <CommetContainer>
      <h1>응답자에게 감사 인사를 남겨보세요.</h1>
      <span>작성한 문구는 설문을 끝 마친 응답자에게 안내됩니다.</span>

      <div>
        <InputContainer>
          <TitleInput className="title" type="text" onChange={onTitleChange} defaultValue={closinTitle} />
          <div>
            <span className="content-length">8&nbsp;</span>
            <span> / 20자</span>
          </div>
        </InputContainer>
        <InputContainer>
          <SubjectInput onChange={onSubjectChange} defaultValue={closingComment} className="subject" type="text" />
          <div>
            <span className="content-length">8&nbsp;</span>
            <span> / 20자</span>
          </div>
        </InputContainer>
      </div>
    </CommetContainer>
  );
};

export default CommentRespondent;

const CommetContainer = styled.section`
  background-color: #fff;
  padding: 0 20px;
  padding-bottom: 32px;

  & h1 {
    padding-top: 32px;
  }
  & span {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
    line-height: 150%;
  }
`;

const InputContainer = styled.div`
  margin-top: 25px;
  & input[type='text'] {
    width: 100%;
    border: none;
    border-bottom: 1px solid ${Common.colors.GY200};
    padding-bottom: 8px;
    outline-style: none;
  }
  & div {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
    padding-right: 5px;
  }
  & span {
    ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY500 })};
  }
  & .content-length {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
  }
`;

const TitleInput = styled.input`
  ${Pretendard({ font: 2, weight: 700, color: '#000' })};
  line-height: 23px;
`;
const SubjectInput = styled.input`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY900 })};
  line-height: 24px;
`;
