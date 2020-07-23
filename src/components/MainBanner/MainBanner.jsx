import React from "react";
import "./MainBanner.scss";
import videos from "../../images/background-video.mp4";

const MainBanner = (props) => {
  return (
    <div className="mainbanner">
      <video autoPlay muted loop>
        <source src={videos} type="video/mp4" />
      </video>
      <h1 className="mainbanner-title">{props.title}</h1>
      <div className="mainbanner-subtitle">{props.subtitle}</div>
      <button className="mainbanner-btn">{props.buttonText}</button>
    </div>
  );
};

export default MainBanner;
