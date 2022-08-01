import { css } from "@emotion/react";

interface IPretendard {
  font: number;
  weight: number;
  color: string;
}

export const Common = {
  colors: {
    alert500: "#eb5757",
    GR500: "#00ac62",
    GR200: "#99dec0",
    GR100: "#d0f8e7",
    GR50: "#e4fff4",
    PK500: "#f292b7",
    PK200: "#ffbcd6",
    PK100: "#ffe4ef",
    PK50: "#fff0f6",
    BL500: "#0066d9",
    BL400: "#0066d9",
    BL300: "#99c2f0",
    BL100: "#cce0f7",
    BL50: "#e5f0fb",
    GY900: "#363841",
    GY700: "#606374",
    GY500: "#8b8fa2",
    GY300: "#c2c5d0",
    GY200: "#d7dae2",
    GY100: "#e7e9f0",
    GY50: "#f3f5fa",
  },
};

export const Pretendard = (props: IPretendard) => css`
  font-family: "Pretendard" !important;
  font-size: ${props.font * 0.625}rem !important;
  font-weight: ${props.weight};
  line-height: ${props.font * 1.5}rem;
  color: ${props.color};
`;
