import React, { useCallback, memo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ImageUpLoadSvg from 'public/icon/img.svg';
import { Common, Pretendard } from 'styles/common';
import { type ISection, type IQuestion } from 'types/survey';

interface IProps {
  hasImageInput: boolean;
  setValue: any;
  value: ISection | IQuestion;
  placeHolder: string;
}

interface IStyle {
  textType: string;
}

const QusetionTitle = ({ hasImageInput, setValue, value, placeHolder }: IProps) => {
  const ImageInputState = css`
    display: ${hasImageInput ? 'inline' : 'none'};
  `;

  const TitleOnChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if ('title' in value) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  const ContentChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if ('content' in value) {
        setValue({
          ...value,
          content: e.currentTarget.value,
        });
      } else {
        setValue({
          ...value,
          descrip: e.currentTarget.value,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  return (
    <TitleAndSubTitle>
      <InputContainer textType={'title' in value ? 'part' : 'question'}>
        <input
          defaultValue={'title' in value ? value.title : value.ask}
          type="text"
          required
          placeholder={`${placeHolder} 제목을 입력해주세요.`}
          onChange={(e) => {
            TitleOnChangeHandler(e);
          }}
        />
        <div css={ImageInputState}>
          <input
            type="file"
            id="select-file"
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.files[0])}
            className="input-file"
            accept="image/jpg, image/png, image/jpeg"
            defaultValue={'title' in value ? value.content : value.descrip}
          />
          <label htmlFor="select-file">
            <ImageUpLoadSvg />
          </label>
        </div>
      </InputContainer>
      <SubTitle
        textType={'title' in value ? 'part' : 'question'}
        type="text"
        placeholder={`${placeHolder}설명(선택사항)`}
        onChange={(e) => {
          ContentChangeHandler(e);
        }}
        name="sub-title"
      />
    </TitleAndSubTitle>
  );
};

export default memo(QusetionTitle);

const TitleAndSubTitle = styled.div`
  margin-top: 12px;
  padding-bottom: 24px;
`;

const InputContainer = styled.div<IStyle>`
  position: relative;
  flex: 1;
  background-color: ${({ textType }) => (textType === 'part' ? Common.colors.GY50 : 'transparent')};

  & input[type='text'] {
    border: 0;
    padding: 12.5px 40px 12.5px 0;
    width: 100%;
    height: 46px;
    border-bottom: 1px solid ${Common.colors.GY100};
    background-color: ${({ textType }) => (textType === 'part' ? Common.colors.GY50 : 'transparent')};

    &::placeholder {
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })};
      line-height: 150%;
    }
  }

  & input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    background-color: ${Common.colors.GY50};
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

const SubTitle = styled.input<IStyle>`
  border: 0;

  width: 100%;
  height: 46px;
  border-bottom: 1px solid ${Common.colors.GY100};
  background-color: ${({ textType }) => (textType === 'part' ? Common.colors.GY50 : 'transparent')};
  &::placeholder {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY500 })};
    line-height: 150%;
  }
`;
