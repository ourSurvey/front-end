import styled from "@emotion/styled";
import { Common } from "styles/common";

type Props = {
  onClick: () => void;
};

const Dimmer = (props: Props) => {
  return <DimmerContainer onClick={props.onClick}></DimmerContainer>;
};

export default Dimmer;

const DimmerContainer = styled.div`
  position: absolute;
  width: calc(100% + 20 * 2);
  height: calc(100% + 56.5);
  margin: -21.5px -20px -35px -20px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 40%;
  background-color: ${Common.colors.GY500};
  z-index: 100;
`;
