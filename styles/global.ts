import { css } from '@emotion/react';

export const global = css`
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif, Pretendard;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
