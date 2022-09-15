import CreateSurveyHeader from "components/survey/CreateSurveyHeader";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import OutLineButton from "components/common/OutLineButton";
import { Button } from "components/common/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { surveyState } from "states/survey";
import { useRecoilState } from "recoil";

const Index = () => {
  const [content, setContent] = useState("");
  const [surVeyData, setSurveyData] = useRecoilState(surveyState);
  const [visibleSpan, setvisibleSpan] = useState(1);
  const [title, setTitle] = useState("");
  const router = useRouter();
  const btnDisable = content !== "" && title !== "";

  const Title = styled.span`
    opacity: ${visibleSpan};
  `;

  const onClickHandler = () => {
    setSurveyData({
      ...surVeyData,
      subject: title,
      content: content,
    });
  };

  useEffect(() => {
    if (content !== "") {
      setvisibleSpan(0);
    } else {
      setvisibleSpan(1);
    }
  }, [content]);

  return (
    <Summary>
      <header>
        <CreateSurveyHeader hasUnderLine={true} name="설문의 개요를 작성해주세요." step="01" />
      </header>

      <form>
        <input type="text" placeholder="제목" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        <TextAreaContainder>
          <Title>설문에 대한 설명을 적어주세요</Title>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            placeholder="&#13;&#10;ex) 모집 계기, 참여시 리워드 등"
            name="survey-summary"
          ></textarea>
        </TextAreaContainder>
        <ButtonContainer>
          <OutLineButton isDisabled={false} textColor={Common.colors.GY900} btnText="임시저장" borderColor={Common.colors.GY900} />
          <Link href="/write">
            <a>
              <Button isDisabled={!btnDisable} onClick={onClickHandler} textColor="#fff" btnText="다음" color={Common.colors.BL500} />
            </a>
          </Link>
        </ButtonContainer>
      </form>
    </Summary>
  );
};

export default Index;

const Summary = styled.div`
  position: relative;
  height: 100%;
  & header {
    margin-bottom: 28px;
    & header {
      padding: 0;
      padding-bottom: 14px;
    }
  }
  & form {
    display: flex;
    flex-direction: column;
    height: calc(100% - 114px);
  }

  & input {
    width: 100%;
    height: 33px;
    padding: 5px 10px;
    border: none;
    border-bottom: 1px solid ${Common.colors.GY100};
    margin-bottom: 12px;
  }
  & ::placeholder {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY300 })}
    line-height: 150%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 34px;
  right: 26px;

  & button {
    height: 36px;
    font-size: 0.75rem;
    padding: 9px 15px;
    border-radius: 5px;
    line-height: 150%;
    width: auto;
  }
  & button:not(:last-child) {
    margin-right: 15px;
  }
`;

const TextAreaContainder = styled.div`
  position: relative;
  border: none;
  height: 100%;
  width: 100%;
  flex: 1;
  & span {
    position: absolute;
    top: 10px;
    left: 10px;
    ${Pretendard({ font: 1.3, weight: 400, color: Common.colors.GY500 })}
    line-height: 150%;
  }

  & textarea {
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    border: none;
    resize: none;
  }
`;
