import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import ImageUpLoadSvg from "public/icon/img.svg";
import React from "react";
import { css } from "@emotion/react";

interface IProps {
  hasImageInput: boolean;
}

const QusetionTitle = ({ hasImageInput }: IProps) => {
  const ImageInputState = css`
    display: ${hasImageInput ? "inline" : "none"};
  `;

  return (
    <TitleAndSubTitle>
      <InputContainer>
        <input type="text" placeholder="질문 제목을 입력해주세요." />
        <div css={ImageInputState}>
          <input
            type="file"
            id="select-file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.files[0])}
            className="input-file"
            accept="image/jpg, image/png, image/jpeg"
          />
          <label htmlFor="select-file">
            <ImageUpLoadSvg />
          </label>
        </div>
      </InputContainer>
      <SubTitle type="text" placeholder="파트설명(선택사항)" name="sub-title" />
    </TitleAndSubTitle>
  );
};

export default QusetionTitle;

const TitleAndSubTitle = styled.div`
  margin-top: 12px;
`;

const InputContainer = styled.div`
  position: relative;
  flex: 1;

  & input[type="text"] {
    border: 0;
    padding: 12.5px 40px 12.5px 0;
    width: 100%;
    height: 46px;
    border-bottom: 1px solid ${Common.colors.GY100};

    &::placeholder {
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })};
      line-height: 150%;
      /* identical to box height, or 21px */

      letter-spacing: -0.03em;
    }
  }

  & input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  & svg {
    position: absolute;

    right: 15px;
    top: 13px;
  }
  & label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
`;

const SubTitle = styled.input`
  border: 0;

  width: 100%;
  height: 46px;
  border-bottom: 1px solid ${Common.colors.GY100};

  &::placeholder {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY500 })};
    line-height: 150%;
    /* identical to box height, or 21px */

    letter-spacing: -0.03em;
  }
`;
