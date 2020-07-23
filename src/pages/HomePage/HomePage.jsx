import React from "react";
import MainBanner from "../../components/MainBanner/MainBanner";
import ImageBanner from "../../components/ImageBanner/ImageBanner";
import APITester from "../../components/APITester/APITester";
import ContentVideo from "../../components/ContentVideo/ContentVideo";

const HomePage = () => (
  <>
    <MainBanner
      title="Processe seus documentos físicos de uma maneira muito mais rápida e simples"
      subtitle="Utilize os beneficios da inteligencia artificial para poupar seu trabalho manual"
      buttonText="ENTENDA MAIS"
    />
    <ContentVideo />
    <ImageBanner subtitle="Acelere e melhore processos de input manuais do seu negócio, assim diminuido custos e aumentando precisão dos dados" />
    <APITester />
  </>
);

export default HomePage;
