/** @jsxImportSource @emotion/react */
import Image from "next/image";
import logo from "public/images/main-logo.png";
import type { NextPage } from "next";
import Link from "next/link";
import { css } from "@emotion/react";
import { Common, Pretendard } from "styles/common";
const Start: NextPage = () => {
  const btn = css`
    height: 50px;
    width: 90%;
    display: flex;
    justify-content: center;
    margin-top: 42px;
    align-items: center;
    padding: 10px 15px;
    background-color: ${Common.colors.BL500};
    border-radius: 10px;
    ${Pretendard({ font: 1.4, weight: 700, color: "#fff" })}
  `;

  return (
    <div
      css={css`
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 90%;
          position: relative;
        `}
      >
        <Image src={logo} layout="responsive" alt="메인로고" />
      </div>
      <Link href="/">
        <p css={btn}>OUR SURVEY 시작하기</p>
      </Link>
    </div>
  );
};

export default Start;
