import styled from '@emotion/styled';
import ImageUpLoadSvg from 'public/icon/img.svg';
import SlideArrow from 'public/icon/slide-arrow.svg';
import { Common, SpaceBetween } from 'styles/common';

const ImageUpload = () => {
  return (
    <MultipleSelectionLi>
      <SlideArrow />
      <InputContainer>
        <input
          type="file"
          id="select-file"
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {console.log(e.target.files[0])}}
          className="input-file"
          accept="image/jpg, image/png, image/jpeg"
        />
        <label htmlFor="select-file">
          <ImageUpLoadSvg />
        </label>
      </InputContainer>
    </MultipleSelectionLi>
  );
};

export default ImageUpload;

const MultipleSelectionLi = styled.li`
  ${SpaceBetween()}
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
  flex: 1;
  margin-left: 7px;

  width: 100%;
  height: 46px;
  border: 1px solid ${Common.colors.GY300};
  border-radius: 10px;
  padding: 12px 15px;
  & input[type='file'] {
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
