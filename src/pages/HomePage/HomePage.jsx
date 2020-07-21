import React from "react";
import MainBanner from "../../components/MainBanner/MainBanner";
import ImageBanner from "../../components/ImageBanner/ImageBanner";
import APITester from "../../components/APITester/APITester";

const HomePage = () => (
  <>
    <MainBanner
      title="Documentos são essenciais para qualquer negócio, não deixe que isso seja um problema para o seu"
      subtitle="Docton busca simplificar o processamento desses documentos"
      buttonText="ENTENDA MAIS"
    />
    <ImageBanner subtitle="Acelere e melhore processos de input manuais do seu negócio através de inteligência artificial" />
    <APITester />
  </>
);

export default HomePage;
