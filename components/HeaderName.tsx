import React from "react";
import { IconContext } from "react-icons";
import HeaderNameCss from "styles/components/HeaderName.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CSS from "csstype";

type Props = {
  name: string;
  hasBack: boolean;
  hasNext: boolean;
};

const HeaderName = (props: Props) => {
  const { name, hasBack, hasNext } = props;

  const leftMargin: string = !hasBack ? "20px" : "";
  const rignhtMargin: string = !hasNext ? "20px" : "";
  const inline: CSS.Properties = {
    marginLeft: leftMargin,
    marginRight: rignhtMargin,
  };
  return (
    <div className={HeaderNameCss.headerName}>
      <div className={HeaderNameCss.arrow}>
        {hasBack ? (
          <IconContext.Provider value={{ size: "20" }}>
            {" "}
            <IoIosArrowBack />
          </IconContext.Provider>
        ) : (
          ""
        )}
      </div>
      <span className={HeaderNameCss.name} style={inline}>
        {name}
      </span>
      <div className={HeaderNameCss.arrow}>
        {hasNext ? (
          <IconContext.Provider value={{ size: "20" }}>
            {" "}
            <IoIosArrowForward />
          </IconContext.Provider>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HeaderName;
