import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import ImageUpLoadSvg from "public/icon/img.svg";
import React, { useCallback, memo } from "react";
import { css } from "@emotion/react";
import { ISection, IQuestion } from "types/survey";

interface IProps {
  hasImageInput: boolean;
  setValue: any;
  value: ISection | IQuestion;
  placeHolder: string;
}

const QusetionTitle = ({ hasImageInput, setValue, value, placeHolder }: IProps) => {
  const ImageInputState = css`
    display: ${hasImageInput ? "inline" : "none"};
  `;

  const TitleOnChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if ("title" in value) {
        setValue({
          ...value,
          title: e.currentTarget.value,
        });
      } else {
        setValue({
          ...value,
          ask: e.currentTarget.value,
        });
      }
    },
    [value]
  );

  const ContentChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if ("content" in value) {
        setValue({
          ...value,
          content: e.currentTarget.value,
        });
      } else {
        setValue({
          ...value,
          explain: e.currentTarget.value,
        });
      }
    },
    [value]
  );

  return (
    <TitleAndSubTitle>
      <InputContainer>
        <input type="text" placeholder={`${placeHolder} 제목을 입력해주세요.`} onChange={(e) => TitleOnChangeHandler(e)} />
        <div css={ImageInputState}>
          <input
            type="file"
            id="select-file"
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.files[0])}
            className="input-file"
            accept="image/jpg, image/png, image/jpeg"
          />
          <label htmlFor="select-file">
            <ImageUpLoadSvg />
          </label>
        </div>
      </InputContainer>
      <SubTitle type="text" placeholder={`${placeHolder}설명(선택사항)`} onChange={(e) => ContentChangeHandler(e)} name="sub-title" />
    </TitleAndSubTitle>
  );
};

export default memo(QusetionTitle);

const TitleAndSubTitle = styled.div`
  margin-top: 12px;
  padding-bottom: 24px;
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
  }
`;
