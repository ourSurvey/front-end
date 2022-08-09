/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import { Common } from "styles/common";

interface IProps {
  onBoardingStep: number;
}
const StepProgress = ({ onBoardingStep }: IProps) => {
  const liStyle = css`
    border: 3px solid ${Common.colors.GR500} !important;
    z-index: 1;
  `;
  const completed = css`
    color: white;
    position: absolute;
    background-color: ${Common.colors.GR500};
    background-image: url("images/whiteCheck.png");
    background-position: 50%;
    ${liStyle}
    &:not(#first)::before {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 9px;
      height: 3px;
      width: ${window.innerWidth / 2 - 36}px;
      background-color: ${Common.colors.GR500} !important;
    }
    z-index: 10;
  `;
  const proceeding = css`
    border: 3px solid ${Common.colors.GR200} !important;
    z-index: 5;
    &:before {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 9px;
      height: 3px;
      width: ${window.innerWidth / 2 - 36}px;
      background-color: ${Common.colors.GR200} !important;
    }
  `;

  const twoStepReturnCssStyle = (): SerializedStyles | null => {
    if (onBoardingStep === 1) {
      return null;
    } else if (onBoardingStep === 2) {
      return proceeding;
    } else {
      return completed;
    }
  };

  return (
    <StepProgressBar>
      <li id="first" css={onBoardingStep !== 1 ? completed : ""}></li>
      <li css={twoStepReturnCssStyle}></li>
      <li css={onBoardingStep === 3 ? proceeding : ""}></li>
    </StepProgressBar>
  );
};

export default StepProgress;

const StepProgressBar = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0;
  list-style: none;
  & li {
    position: relative;
    text-align: center;
    width: 12px;
    height: 12px;
    border: 3px solid ${Common.colors.GY100};
    border-radius: 50%;

    &:first-of-type {
      border: 3px solid ${Common.colors.GR500};
    }

    &:not(:first-of-type)::before {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 9px;
      height: 3px;
      width: ${window.innerWidth / 2 - 36}px;
      background-color: ${Common.colors.GY100};
      z-index: -1;
    }
  }
`;
