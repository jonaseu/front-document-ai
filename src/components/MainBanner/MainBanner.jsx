import React from "react";
import "./MainBanner.scss";

const MainBanner = (props) => {
  return (
    <div className="mainbanner">
      <h1 className="mainbanner-title">{props.title}</h1>
      <div className="mainbanner-subtitle">{props.subtitle}</div>
      <button className="mainbanner-btn">{props.buttonText}</button>
    </div>
  );
};

export default MainBanner;
