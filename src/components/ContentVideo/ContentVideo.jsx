import React from "react";
import "./ContentVideo.scss";
import videos from "../../images/dotcotn_architecture_example.mp4";

const contentVideoMessages = () => {
  return {
    title: "Quer saber como IA pode ajudar seu negócio?",
    subtitle:
      "Envie seus documentos escaneados e obtenha os dados em formato de dado estruturado!",
    videoPath: "../../images/dotcotn_architecture_example.mp4",
  };
};

const ContentVideo = (props) => {
  const messages = contentVideoMessages();
  return (
    <div className="contentvideo">
      <div className="contentvideo-text-container">
        <h1 className="contentvideo-title" id={messages.title}>
          {messages.title}
        </h1>
        <p className="contentvideo-text">{messages.subtitle}</p>
      </div>
      <div className="contentvideo-video">
        <video muted loop autoPlay className="contentvideo-size" id="myVideo">
          <source src={videos} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default ContentVideo;
