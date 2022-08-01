import CheckBox from "components/CheckBox";
import React from "react";

type Props = {};

const TosContainer = (props: Props) => {
  return (
    <div>
      <span>약관동의</span>
      <CheckBox text="약관을 동의 합니다" />
    </div>
  );
};

export default TosContainer;
