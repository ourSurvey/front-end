import React from "react";
import MultipleSelectionInput from "./MultipleSelectionInput";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
const MultipleSelection = () => {
  return (
    <Option>
      <MultipleSelectionInput />
    </Option>
  );
};

export default MultipleSelection;

const Option = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
